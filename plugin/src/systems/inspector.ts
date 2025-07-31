import { Dependency, GUI, OnStart, System, View } from "@rbxts/comet";
import { MainSystem } from "./main";
import { MountInspector } from "ui/inspector/mount";

@System()
export class InspectorSystem implements OnStart {
	private mainSystem = Dependency(MainSystem);
	private gui = Dependency(GUI);
	public View: View;

	constructor() {
		this.View = this.gui.createWidget(
			"Inspector",
			new Vector2(300, 500),
			new Vector2(100, 100),
			Enum.InitialDockState.Left,
		);
	}

	onStart() {
		this.View.linkButton(this.mainSystem.button);
		this.View.mount(MountInspector);
	}
}
