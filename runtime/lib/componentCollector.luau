local constants = require(script.Parent.constants)

-- Gets every component in the current realm
return function(): { ModuleScript }
	-- In server side, game:IsLoaded() is always false
	if constants.mainDirectory == game:GetService("StarterPlayer") and not game:IsLoaded() then 
		game.Loaded:Wait()
	end

	local components: { ModuleScript } = {}
	-- Iterating throught every descendant of the realm
	for _, component in ipairs(constants.mainDirectory:GetDescendants()) do
		if not (component:IsA("ModuleScript")) then -- If not a module, skipping
			continue
		end
		-- TODO: Fix when I actually know how does string pattern work
		local splitted = component.Name:split(".")
		if not (splitted[#splitted] == "component") then
			continue
		end
		
		table.insert(components, component)
	end

	return components
end
