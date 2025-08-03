local compo = require(game:GetService("ReplicatedStorage").compo)

compo.launch():andThen(function()
    print("resolved")
end)