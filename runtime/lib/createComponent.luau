local types = require(script.Parent.types)

local function createComponent(
	transformer: (component: types.component) -> (),
	fields: {}
): types.componentBuilder
	return {
		constructor = function(instance: Instance, refinatedFields : any): types.component
			local component = {
				instance = instance,
				fields = refinatedFields,
			} :: types.component

			transformer(component)
			return component
		end,
		fields = fields,
	}
end

return createComponent
