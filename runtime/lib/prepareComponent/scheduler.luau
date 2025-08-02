local RunService = game:GetService("RunService")
local promise = require(script.Parent.Parent.Parent.promise)
local lemonSignal = require(script.Parent.Parent.Parent.lemonsignal)
local types = require(script.Parent.Parent.types)

local scheduler = {}
scheduler.fixedTime = 0.02
scheduler.initialized = false
scheduler.initGroupFinished = false
scheduler.onInitGroupFinished = lemonSignal.new()
-- a table to store every component registered in the life cycle
scheduler.components = {}
scheduler.awakeComponents = {}
scheduler.startComponents = {}
scheduler.activeComponents = {}
scheduler.activeUpdateComponents = {}
scheduler.activeFixedUpdateComponents = {}

function scheduler.insertIntoLifeCycle(component: types.component)
	if not scheduler.initGroupFinished then
		scheduler.onInitGroupFinished:Wait()
		RunService.Heartbeat:Wait()
	end

	if component.awake then
		component.awake()
	end

	if component.onEnable then
		component.onEnable()
	end

	RunService.Heartbeat:Wait()
	if component.start then
		component.start()
	end
end

function scheduler.registerComponent(component: types.component)
	scheduler.activeComponents[component] = true

	if component.update then
		scheduler.activeUpdateComponents[component] = true
	end
	if component.fixedUpdate then
		scheduler.activeFixedUpdateComponents[component] = true
	end

	if scheduler.initialized then
		scheduler.insertIntoLifeCycle(component)
	else
		scheduler.components[component] = true
		if component.awake then
			scheduler.awakeComponents[component] = true
		end

		if component.start then
			scheduler.startComponents[component] = true
		end
	end
end

function scheduler.initializeLifecycle()
	scheduler.initialized = true

	return promise.new(function(resolve)
		-- awake and onEnable phase
		local threads = {}
		for component in pairs(scheduler.components) do
			-- awake phase
			local thread = promise.resolve
			if typeof(component.awake) == "function" then
				thread = promise.promisify(component.awake)
			end

			-- onEnable phase

			threads[#threads + 1] = thread():andThen(function()
				if component.onEnable then
					component.onEnable()
				end
			end)
		end

		-- waiting until the first 2 phases finish
		promise.all(threads):await()
		RunService.Heartbeat:Wait() -- waits a frame to call start

		-- start phase
		for component in pairs(scheduler.startComponents) do
			promise.promisify(component.start)()
		end

		scheduler.initGroupFinished = true
		scheduler.onInitGroupFinished:Fire()
		RunService.Heartbeat:Wait() -- waits another frame to call update

		resolve()
		scheduler.initializeMainLoop()
	end)
end

function scheduler.initializeMainLoop()
	RunService.Heartbeat:Connect(function()
		for component in pairs(scheduler.activeUpdateComponents) do
			promise.promisify(component.update)()
		end
	end)

	coroutine.wrap(function()
		while true do
			for component in pairs(scheduler.activeFixedUpdateComponents) do
				promise.promisify(component.fixedUpdate)()
			end
			task.wait(scheduler.fixedTime)
		end
	end)()
end

function scheduler.setComponentActive(component: types.component, active: boolean | nil)
	if not scheduler.components[component] then
		return
	end

	if active and component.onEnable and not scheduler.activeComponents[component] then
		promise.promisify(component.onEnable)()
	elseif component.onDisable and scheduler.activeComponents[component] then
		promise.promisify(component.onDisable)()
	end

    active = active or nil
	scheduler.activeComponents[component] = active :: boolean
	scheduler.activeFixedUpdateComponents[component] = active :: boolean
	scheduler.activeUpdateComponents[component] = active :: boolean
end

function scheduler.unregisterComponent(component: types.component)
	return promise.resolve():andThen(function()
		RunService.Heartbeat:Wait()
		-- Now I can safety call the destroy method
		scheduler.setComponentActive(component, false)
        scheduler.components[component] = nil
		if component.onDestroy then
			component.onDestroy()
		end
	end)
end

return {
	initializeLifecycle = scheduler.initializeLifecycle,
	registerComponent = scheduler.registerComponent,
	unregisterComponent = scheduler.unregisterComponent,
	setComponentActive = scheduler.setComponentActive,
}
