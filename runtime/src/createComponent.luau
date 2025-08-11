local types = require(script.Parent.types)

local function createComponent<TComponent>(
	transformer: (component: TComponent) -> (),
	fields: {}
): types.componentBuilder<any, any>
	return {
		constructor = function(instance: Instance, refinatedFields : any): types.component<any, any>
			local component = {
				instance = instance,
				fields = refinatedFields,
			}

			transformer(component :: any)
			return component
		end,
		fields = fields,
	}
end

return createComponent
