local constants = require("./constants")

--[=[
    Fetches all components within the realm.
    @returns An array containing the corresponding ModuleScripts.
]=]
return function(): { ModuleScript }
	-- In server side, game:IsLoaded() is always false
	if constants.realm == game:GetService("StarterPlayer") and not game:IsLoaded() then 
		game.Loaded:Wait()
	end

	local components: { ModuleScript } = {}
	for _, component in ipairs(constants.realm:GetDescendants()) do
		if not (component:IsA("ModuleScript")) then -- If is not a module, skipping it
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
