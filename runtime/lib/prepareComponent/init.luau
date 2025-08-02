local CollectionService = game:GetService("CollectionService")
local constants = require(script.Parent.constants)
local validate = require(script.validate)
local types = require(script.Parent.types)
local scheduler = require(script.scheduler)
local janitor = require(script.Parent.Parent.Parent.Packages.janitor)

local function manage(componentBuilder: types.componentBuilder, id: string, instance: Instance)
	local attribute = constants.COMPONENT_ACTIVE .. id
	local active = instance:GetAttribute(attribute)
	local trash = janitor.new()
	trash:LinkToInstance(instance)
	
	local function register()
		-- Building component an registering it
		local component = componentBuilder.constructor(instance)
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
	local id = component:GetAttribute(constants.COMPONENT_ID) :: string

	if not id then
		warn(
			`A component was defined with '.component' ({component.Name}), but there's no ID associated with it. Did you forget to add a '{constants.COMPONENT_ID}' attribute?.`
		)
		return
	end

	local componentBuilder = require(component) :: types.componentBuilder
	if not validate(componentBuilder) then
		warn(`{component.Name} is not a valid component.`)
		return
	end

	local tag = constants.COMPONENT_TAG .. id

	-- Getting all marked instances to run the component
	for _, instance in ipairs(CollectionService:GetTagged(tag)) do
		manage(componentBuilder, id, instance)
	end

	-- Listening to new marked instances
	CollectionService:GetInstanceAddedSignal(tag):Connect(function(instance)
		manage(componentBuilder, id, instance)
	end)

	-- Launching scheduler
	scheduler.initializeLifeCycle()
end
