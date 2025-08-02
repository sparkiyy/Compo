local constants = require(script.Parent.constants)

-- Gets each component in the current realm
return function(): { ModuleScript }
	if constants.mainDirectory == game:GetService("StarterPlayer") and not game:IsLoaded() then -- In server side, game:IsLoaded() is always false
		game.Loaded:Wait()
	end

	local components: { ModuleScript } = {}
	-- Getting descendants to search components
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
