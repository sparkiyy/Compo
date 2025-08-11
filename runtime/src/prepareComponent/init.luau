local CollectionService = game:GetService("CollectionService")
local constants = require("./constants")
local validate = require("@self/validate")
local scheduler = require("@self/scheduler")
local janitor = require("../Packages/janitor")
local t = require("../Packages/t")

local function getRefinatedFields(fieldDefinitions: { [string]: any }, instance: Instance, id: string, janitor: janitor.Janitor)
	local fieldSuffix = constants.COMPONENT_FIELD .. id
	local fields = {}

	for attribute, value in pairs(instance:GetAttributes()) do
		-- The current attribute is not a component field
		if not attribute:match(fieldSuffix) then
			continue
		end

		local fieldName = attribute:gsub(fieldSuffix, "")
		-- The field is not an actual field
		if not fieldDefinitions[fieldName] then 
			continue
		end
		
		fields[fieldName] = value
		janitor:Add(instance:GetAttributeChangedSignal(attribute):Connect(function()
			fields[fieldName] = instance:GetAttribute(attribute) -- This caches the value, and now we can get rid of unnecessary :GetAttribute calls
		end))
	end

	return setmetatable({}, {
		__index = function(_, index) -- Getting
			return fields[index]
		end,
		__newIndex = function(_, index, value) -- Setting
			instance:SetAttribute(fieldSuffix .. index, value)
		end
	})
end

--[=[
	Tracks the given instance.
]=]
local function manage(componentBuilder: any, id: string, tag: string, instance: Instance, name: string)
	local activeAttributeName = constants.COMPONENT_ACTIVE .. id
	local active = instance:GetAttribute(activeAttributeName)
	local trash = janitor.new()
	trash:LinkToInstance(instance)

	if not (t.boolean(active)) then
		warn(`[🟠WARNING] 'active' attribute is missing or is invalid!: {name}`)
		return
	end

	local function mount()
		-- Building the component and registering it
		local component = componentBuilder.constructor(instance, getRefinatedFields(componentBuilder.fields, instance, id, trash) :: any)
		scheduler.registerComponent(component)

		-- when trash is destroyed, unregistering the component
		trash:Add(function()
			scheduler.unregisterComponent(component)
		end)

		-- when the instance parent changes, checking if destroyed to cleanup component (link to instance already do this, but in studio if you remove an instance, it's not destroyed)
		trash:Add(instance.AncestryChanged:Connect(function(_, parent)
			if parent == nil then
				return
			end
			trash:Destroy()
		end))

		-- when tag removed, destroying component
		trash:Add(CollectionService:GetInstanceRemovedSignal(tag):Connect(function(removedInstance: Instance)
			if instance == removedInstance then
				trash:Destroy()
			end
		end))
		-- listening for active attribute changes
		trash:Add(instance:GetAttributeChangedSignal(activeAttributeName):Connect(function()
			scheduler.setComponentActive(component, instance:GetAttribute(activeAttributeName) :: boolean)
		end))
	end

	-- if the component is not active, we wait until it is active
	if not active then
		local c
		c = trash:Add(instance:GetAttributeChangedSignal(activeAttributeName):Connect(function()
			if instance:GetAttribute(activeAttributeName) then
				c:Disconnect()
				mount()
			end
		end))
		return
	end
	-- if it is already active, mounting it  
	mount()
end

--[=[
	Prepares the given component (module script)
]=]
return function(component: ModuleScript)
	-- Component's id
	local id = component:GetAttribute(constants.COMPONENT_ID) :: string

	if not t.string(id) then
		-- Maybe you deleted component's id attribute
		-- or something went wrong with Compo Inspector
		warn(
			`[🟠WARNING] A component was defined with '.component' ({component.Name}), but there's no ID associated with it (or is not a string). Did you forget to add a '{constants.COMPONENT_ID}' attribute?.`
		)
		return
	end

	-- Requiring component. Returns both constructor and fields
	local s, componentBuilder = pcall(require, component)

	if not s then
		warn(`[🟠WARNING] An error ocurred loading '{component.Name}' component: {componentBuilder}`) -- componentBuilder is the error message.
		return
	end

	if not validate(componentBuilder) then
		warn(`[🟠WARNING] '{component.Name}' has a no valid component format!.`)
		return
	end

	-- Expected component tag
	local targetTag = constants.COMPONENT_TAG .. id

	-- Getting all tagged instances to run the component
	for _, instance in ipairs(CollectionService:GetTagged(targetTag)) do
		manage(componentBuilder, id, targetTag, instance, component.Name)
	end

	-- Listening to new tagged instances
	CollectionService:GetInstanceAddedSignal(targetTag):Connect(function(instance)
		manage(componentBuilder, id, targetTag, instance, component.Name)
	end)
end
