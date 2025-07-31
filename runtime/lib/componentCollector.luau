local constants = require(script.Parent.constants)

return function(): { Instance }
	if not game:IsLoaded() then
		game.Loaded:Wait()
	end

	local components: { Instance } = {}
	for _, component in ipairs(constants.mainDirectory:GetDescendants()) do
		if not (component:IsA("ModuleScript")) then
			continue
		end
		local splitted = component.Name:split(".")
		if not (splitted[#splitted] == "component") then
			continue
		end

		table.insert(components, component)
	end

	return components
end
