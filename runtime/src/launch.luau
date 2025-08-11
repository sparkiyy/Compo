local promise = require("../Packages/promise")
local componentCollector = require("./componentCollector")
local prepareComponent = require("./prepareComponent")
local scheduler = require("./prepareComponent/scheduler")
local _launched = false

--[=[
	Launches Compo and starts its lifecycle
	@return A promise that resolves when the components enter the start() phase
]=]
return function() : promise.Promise
	return promise
		.new(function(resolve, reject)
			if _launched then
				reject("launch() has already been called and cannot be called again!")
				return
			end

			_launched = true

			-- Registering every component into the scheduler
			for _, component in ipairs(componentCollector()) do
				prepareComponent(component)
			end

			-- Initializing scheduler (yields until start())
			scheduler.initializeLifecycle()
			resolve()
		end)
		:catch(function(e: string)
			error("[🔴FATAL] An unknown error occurred launching compo: " .. e)
		end)
		
end
