--!strict
local types = require(script.Parent.Parent.types)
return function(component: types.componentBuilder)
	if not component.constructor and typeof(component.constructor) ~= "function" then return false end
		
	return true
end
