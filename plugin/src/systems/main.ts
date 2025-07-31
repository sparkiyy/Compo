import {History, GUI, Button, Dependency, System, Studio } from "@rbxts/comet";
import assets from "assets/assets";

@System()
export class MainSystem {
	private gui = Dependency(GUI);
	public button: Button;

	constructor() {
		this.button = this.gui.createButton(
			"Inspector",
			"Open the inspector window",
			assets.icons.toolbarIcon,
			true,
			true
		);
	}
}