local promise = require(script.Parent.Parent.promise)
local componentCollector = require(script.Parent.componentCollector)
local prepareComponent = require(script.Parent.prepareComponent)
local scheduler = require(script.Parent.prepareComponent.scheduler)

local _launched = false

-- Returns a promise that resolves when scheduler starts
return function()
	return promise
		.new(function(resolve, reject)
			if _launched then
				reject("launch() should be only called once!")
			end
			_launched = true

			-- Collecting local realm components
			local components = componentCollector()

			-- Preparing every componentent (gets registered into the scheduler)
			for _, component in ipairs(components) do
				prepareComponent(component)
			end
		end)
		:andThen(function()
			scheduler.initializeLifecycle() -- Runs compo lifecycle
		end)
		:catch(function(e)
			warn("[🔴FATAL] An unknown error ocurred launching compo: ", e)
		end)
end
