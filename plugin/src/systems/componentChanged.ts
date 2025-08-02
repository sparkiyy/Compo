import { OnEnd, OnRender, OnStart, System, Track } from "@rbxts/comet";
const StudioService = game.GetService("StudioService")

@System()
export class ComponentChangedSystem implements OnStart {
    onStart() {
        // Active script is not typed :sob:
        Track(StudioService.GetPropertyChangedSignal("ActiveScript").Connect(() => {
            print("ActiveScript changed", StudioService.ActiveScript.Name)
        }))
    }
}