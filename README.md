<div>
    <p align="center"><img src="assets/icons/toolbarIcon.png" height=100 width=100></p>
    <h1 align="center">Compo</h1>
    <p align="center">
        <img alt="Download plugin badge" src="https://img.shields.io/badge/Download-plugin-yellow"/> 
        <a href="UNLICENSE.md"><img alt="Unlicensed badge" src="https://img.shields.io/badge/License-The%20Unlicense-pink"/></a>
    </p>
    <p align="center">Compo is a lightweight, Monobehaviour-like <b>component framework</b> for roblox 📦.</p>
</div>

## Installation 🦭

You can install compo via wally or downloading the .rbxm

```toml
[dependencies]
compo = "sparkiyy/compo@VERSION"
```

## Guide 🐆
🚧 This guide assumes you have already installed compo inspector.

Components are created with the .component suffix, this indicated the plugin to register it to show it up in the inspector.



Components **currently** can be descendants of one of these 2 realms:
- Starter Player Scripts
- Server Script Service


```lua
-- myAwesomeComponent.component.luau
local compo = require(game.ReplicatedStorage.compo)

return compo.createComponent(function(component)
    function component.start()
        print("Hello World c:, from: " .. component.instance.Name)   
    end
    
    function component.onDestroy()
        print("Goodbye World :c, from: " .. component.instance.Name) 
    end
end)
```

Compo Inspector will automatically attach an unique id to the module, Compo uses this ID to track the component in runtime so don't remove / modify it.

To initialize Compo, you need to start it in each realm.
```lua
-- client.lua
local compo = require(game.ReplicatedStorage.compo)

-- start() returns a promise that resolves when the main loop starts
compo.start():andThen(function()
    print("Compo started!")
end)
```

And that's all!

The real power of Compo comes with it's inspector, wich is an extension of Roblox properties panel:


> [!NOTE]
> Compo was thinked to be used it in companion with the **Compo Inspector** plugin, you can technically use without it, but you will need to asign every value manually **(do not)**.
