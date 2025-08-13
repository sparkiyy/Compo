local RunService = game:GetService("RunService")

local promise = require(script.Parent.Parent.promise)
local t = require(script.Parent.Parent.t)
local signal = require(script.Parent.Parent.lemonsignal)

local helper = require("@self/helper")
local types = require("./types")
local constants = require("./constants")

local scheduler = {}
scheduler.fixedTime = 0.02 --TODO: Support for custom fixedTime
scheduler.components = {} -- a table to store every component registered in the life cycle
scheduler.initialized = false
scheduler.onMainLoopInitialized = signal.new()

local LIFECYCLE_METHODS = { "awake", "onEnable", "start", "update", "fixedUpdate", "onDisable", "onDestroy" }

function scheduler.insertIntoLifeCycle(component: types.component<any, any>)
	task.defer(function()
		if not scheduler.initialized then
			scheduler.onMainLoopInitialized:Wait()
		end

		helper.call(component.awake, true)
		helper.call(component.onEnable, true)

		RunService.Heartbeat:Wait()
		if component.start then
			component.start()
		end

		scheduler.addComponent(component)
	end)
end

function scheduler.registerComponent(component: types.component<any, any>)
	if scheduler.initialized then
		scheduler.insertIntoLifeCycle(component)
		return
	end

	scheduler.addComponent(component)
end

function scheduler.addComponent(component: types.component<any, any>)
	local entries = { active = true }
	for _, name in ipairs(LIFECYCLE_METHODS) do
		entries[name] = t.callback(component[name])
	end
	scheduler.components[component] = entries
end

function scheduler.initializeLifecycle()
	return promise.new(function(resolve)
		if scheduler.initialized then
			return
		end
		scheduler.initialized = true
		-- awake and onEnable phase
		-- [[ https://github.com/Sleitnick/Axis/blob/main/src/init.lua#L220 💗]]
		local thread = coroutine.running()
		local componentsRunning = #scheduler.components
		local componentsFinished = 0

		for component in pairs(scheduler.components) do
			-- awake and on enable phase 
			task.spawn(function() 
				helper.call(component.awake, true)
				helper.call(component.onEnable)

				componentsFinished += 1
				if componentsFinished == componentsRunning and coroutine.status(thread) == "suspended" then
					task.spawn(thread)
				end
			end)
		end

		if componentsFinished ~= componentsRunning then
			coroutine.yield(thread)
		end

		RunService.Heartbeat:Wait() -- waits a frame to call start

		-- start phase
		for component, flags in pairs(scheduler.components) do
			helper.call(component.start, true)
		end

		scheduler.initGroupFinished = true
		RunService.Heartbeat:Wait() -- waits another frame to call the main loop

		resolve()
		scheduler.initializeMainLoop()
	end)
end

function scheduler.initializeMainLoop()
	constants.update:Connect(function(deltaTime)
		for component, flags in pairs(scheduler.components) do
			if not flags.active then continue end
			helper.call(component.update, false, deltaTime)
		end
	end)

	coroutine.wrap(function()
		while true do
			for component, flags in pairs(scheduler.components) do
				if not flags.active then continue end
				helper.call(component.fixedUpdate)
			end
			task.wait(scheduler.fixedTime)
		end
	end)()

	scheduler.onMainLoopInitialized:Fire()
end

function scheduler.setComponentActive(component: types.component<any, any>, active: boolean)
	if not scheduler.components[component] then
		return
	end
	local currentState = scheduler.components[component]

	if currentState.active ~= active then
		currentState.active = active
		helper.call(active and component.onEnable or component.onDisable)
	end

	scheduler.components[component].active = active
end

function scheduler.unregisterComponent(component: types.component<any, any>)
	task.defer(function()
		RunService.Heartbeat:Wait()
		scheduler.setComponentActive(component, false)
		scheduler.components[component] = nil
		helper.call(component.onDestroy)
	end)
end

return {
	initializeLifecycle = scheduler.initializeLifecycle,
	registerComponent = scheduler.registerComponent,
	unregisterComponent = scheduler.unregisterComponent,
	setComponentActive = scheduler.setComponentActive,
}
