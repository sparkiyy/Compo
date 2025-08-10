local compo = require(game.ReplicatedStorage.compo)


type component = compo.component<Part, {
    damage: number
}>

return compo.createComponent(function(component: component)
    function component.start()
        component.instance.Touched:Connect(function(hit: Instance)
            local humanoid = hit.Parent and hit.Parent:FindFirstChildOfClass("Humanoid")
            if not humanoid then return end

            humanoid.Health -= component.fields.damage
        end)

        component.instance.Color = Color3.new(1,0,0)
        component.instance.Material = Enum.Material.Neon
    end
end, {damage = compo.fields.number(1)})