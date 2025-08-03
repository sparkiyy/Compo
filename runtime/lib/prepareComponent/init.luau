local CollectionService = game:GetService("CollectionService")
local constants = require(script.Parent.constants)
local validate = require(script.validate)
local types = require(script.Parent.types)
local scheduler = require(script.scheduler)
local janitor = require(script.Parent.Parent.Parent.Packages.janitor)
local t = require(script.Parent.Parent.Parent.Packages.t)

local function getRefinatedFields(instance: Instance, id: string)
	-- Proxy fields
	return setmetatable({}, {
		__index = function(_, index)
			return instance:GetAttribute(constants.COMPONENT_FIELD .. id .. index)
		end
	})
end

local function manage(componentBuilder: types.componentBuilder, id: string, tag: string, instance: Instance)
	local attribute = constants.COMPONENT_ACTIVE .. id
	local active = instance:GetAttribute(attribute)
	local trash = janitor.new()
	trash:LinkToInstance(instance)

	local function register()
		-- Building component an registering it
		local component = componentBuilder.constructor(instance, getRefinatedFields(instance, id) :: any)
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
		trash:Add(instance:GetAttributeChangedSignal(attribute):Connect(function()
			scheduler.setComponentActive(component, instance:GetAttribute(attribute) :: boolean)
		end))
	end

	if not active then
		local c
		c = trash:Add(instance:GetAttributeChangedSignal(attribute):Connect(function()
			if instance:GetAttribute(attribute) then
				c:Disconnect()
				register()
			end
		end))
		return
	end

	register()
end

return function(component: ModuleScript)
	-- Component's id
	local id = component:GetAttribute(constants.COMPONENT_ID) :: string

	if not t.string(id) then
		-- Maybe you deleted component's id attribute
		warn(
			`[🟠WARNING] A component was defined with '.component' ({component.Name}), but there's no ID associated with it (or is not a string). Did you forget to add a '{constants.COMPONENT_ID}' attribute?.`
		)
		return
	end

	-- Requiring component. Returns both constructor and fields
	local s, componentBuilder = pcall(require, component)
	componentBuilder = componentBuilder :: types.componentBuilder

	if not s then
		warn(`[🟠WARNING] An error ocurred loading'{component.Name}' component: {componentBuilder}`)
		return
	end

	if not validate(componentBuilder) then
		warn(`[🟠WARNING] '{component.Name}' has a no valid component format!.`)
		return
	end

	local targetTag = constants.COMPONENT_TAG .. id

	-- Getting all marked instances to run the component
	for _, instance in ipairs(CollectionService:GetTagged(targetTag)) do
		manage(componentBuilder, id, targetTag, instance)
	end

	-- Listening to new marked instances
	CollectionService:GetInstanceAddedSignal(targetTag):Connect(function(instance)
		manage(componentBuilder, id, targetTag, instance)
	end)
end
