local compo = require(game.ReplicatedStorage.compo)
type component = compo.component<Part, {
	damage: number,
}>

return compo.createComponent(function(component: component)
	local c: RBXScriptConnection = nil
	local originalMaterial = component.instance.Material
	local originalColor = component.instance.Color
	local firstUpdate = false

	function component.awake()
		error("OMG SOMETHING HAPPENED")
		print("awake phase")
	end

	function component.onEnable()
		print("on enable phase")
		c = component.instance.Touched:Connect(function(hit: Instance)
			local humanoid = hit.Parent and hit.Parent:FindFirstChildOfClass("Humanoid")
			if not humanoid then
				return
			end

			humanoid.Health -= component.fields.damage
		end)

		component.instance.Color = Color3.new(1, 0, 0)
		component.instance.Material = Enum.Material.Neon
	end

	function component.start()
		print("start phase")
	end

	function component.update(d)
		if firstUpdate then
			return
		end
		firstUpdate = true
		print("update phase")
	end

	function component.onDisable()
		print("disable phase")
		if c then
			c:Disconnect()
		end
		component.instance.Material = originalMaterial
		component.instance.Color = originalColor
	end

	function component.onDestroy()
		print("on destroy phase")
	end
end, { damage = compo.fields.number(1) })
