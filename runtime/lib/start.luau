local componentCollector = require(script.Parent.componentCollector)
local runComponent = require(script.Parent.runComponent)

local _started = false
-- Start should be only called once 
return function()
	if _started then
		error("Start should be only called once")
	end
	
	_started = true
	-- Initializes all the components, and starts the life cycle 
	local components = componentCollector()
	for _, component in ipairs(components) do
		runComponent(component)
	end
end