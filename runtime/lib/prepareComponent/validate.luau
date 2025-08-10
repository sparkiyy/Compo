local t = require(script.Parent.Parent.Parent.t)
local types = require(script.Parent.Parent.types)

local IComponent = t.interface({
	constructor = t.callback,
	fields = t.optional(t.table)
})

return function(component: types.componentBuilder)
	return IComponent(component)
end