local promise = require(script.Parent.Parent.promise)
local componentCollector = require(script.Parent.componentCollector)
local runComponent = require(script.Parent.runComponent)
local scheduler = require(script.Parent.runComponent.scheduler)
local _started = false

-- Returns a promise that resolves when all the components are fully loaded
return function()
	return promise.new(function(resolve)
		if _started then
			error("Start should be only called once")
		end

		_started = true
		-- Initializes all the components, and starts the life cycle
		local components = componentCollector()
		
		for _, component in ipairs(components) do
			runComponent(component)
		end
	end):andThen(function() 
		scheduler.initializeLifeCycle()
	end)
end
