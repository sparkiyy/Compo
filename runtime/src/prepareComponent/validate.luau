local t = require("../../Packages/t")
local types = require("../types")

local IComponent = t.interface({
	constructor = t.callback,
	fields = t.optional(t.table)
})

return function(component: types.componentBuilder<any, any>)
	return IComponent(component)
end