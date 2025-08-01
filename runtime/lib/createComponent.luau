--!strict
local types = require(script.Parent.types)

local function createComponent(
	transformer: (component: types.component) -> (),
	fields: {}
): types.componentBuilder
	return {
		constructor = function(instance: Instance): types.component
			local component = {
				instance = instance,
				fields = fields,
			} :: types.component

			transformer(component)
			return component
		end,
		fields = fields,
	}
end

return createComponent
