local CollectionService = game:GetService("CollectionService")
local constants = require(script.Parent.constants)
local validate = require(script.validate)
local types = require(script.Parent.types)
local scheduler = require(script.scheduler)
local janitor = require(script.Parent.Parent.Parent.Packages.janitor)

return function(component: ModuleScript)
	local id = component:GetAttribute(constants.COMPONENT_ID) :: number

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

	local function manage(instance: Instance)
		local attribute = constants.COMPONENT_ACTIVE .. id
		local active = instance:GetAttribute(attribute)

		local function register()
			local component = componentBuilder.constructor(instance)
			scheduler.registerComponent(component)

			local trash = janitor.new()
			trash:Add(function()
				scheduler.unregisterComponent(component)
			end)
			trash:Add(instance.AncestryChanged:Connect(function()
				scheduler.unregisterComponent(component)
			end))
			trash:Add(instance:GetAttributeChangedSignal(attribute):Connect(function()
				scheduler.setComponentActive(component, instance:GetAttribute(attribute) :: boolean)
			end))
			trash:LinkToInstance(instance)
		end

		if not active then
			local c
			c = instance:GetAttributeChangedSignal(attribute):Connect(function()
				if instance:GetAttribute(attribute) then
					c:Disconnect()
					register()
				end
			end)
			return
		end

		register()
	end

	-- Getting all marked instances to run the component
	for _, instance in ipairs(CollectionService:GetTagged(tag)) do
		manage(instance)
	end

	-- Listening to new marked instances
	CollectionService:GetInstanceAddedSignal(tag):Connect(function(instance)
		manage(instance)
	end)

	scheduler.initializeLifeCycle()
end
