local compo = require(game.ReplicatedStorage.compo)
compo.start():andThen(function()
    print("resolved")
end)