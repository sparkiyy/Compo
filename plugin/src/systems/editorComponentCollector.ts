import Attributes from "@rbxts/attributes";
import { OnStart, System, Track } from "@rbxts/comet";
import { String } from "@rbxts/jsnatives";
import { ServerScriptService, StarterPlayer, Workspace } from "@rbxts/services";
import { Trash } from "@rbxts/trash";
import { ComponentRealm, EditorComponentsAtom } from "atoms/editorComponents";
import { COMPONENT_ACTIVE, COMPONENT_ID } from "constants";
import { newUUID } from "utility/uuidGenerator";

@System()
export class EditorComponentCollector implements OnStart {
	private trackingPaths = [StarterPlayer, ServerScriptService];
	onStart() {
		for (const [_, path] of ipairs(this.trackingPaths)) {
			for (const [_, instance] of ipairs(path.GetDescendants())) {
				this.checkComponent(instance, path);
			}

			Track(
				path.DescendantAdded.Connect((child) => {
					this.checkComponent(child, path);
				}),
			);
		}
	}

	private checkComponent(instance: Instance, ancestor: Instance) {
		if (!instance.IsA("ModuleScript")) return;

		// is a component
		if (this.checkName(instance)) {
			this.registerComponent(instance, ancestor);
		}

		const potentialComponentTrash = new Trash();
		// is not a component (currently, so checking the instance name to know if we can turn it into a component)
		potentialComponentTrash.linkToInstance(instance, {
			trackInstance: false,
		});

		// checking name changes
		potentialComponentTrash.add(
			instance.GetPropertyChangedSignal("Name").Connect(() => {
				if (this.checkName(instance)) {
					this.registerComponent(instance, ancestor);
					potentialComponentTrash.destroy();
				}
			}),
		);

		// checking parent changes
		potentialComponentTrash.add(
			instance.AncestryChanged.Connect((_, parent) => {
				if (!instance.IsDescendantOf(ancestor)) {
					potentialComponentTrash.destroy();
				}
			}),
		);
	}

	private registerComponent(component: Instance, ancestor: Instance) {
		const attributes = Attributes<{ [COMPONENT_ID]: string | undefined }>(component);
		if (!attributes._component_id) {
			attributes._component_id = newUUID();
		}

		const components = {
			...EditorComponentsAtom(),
			[attributes._component_id]: {
				instance: component,
				name: this.getName(component),
				realm: ancestor === StarterPlayer ? ComponentRealm.Client : ComponentRealm.Server,
				id: attributes._component_id,
			},
		};

		const componentTrash = new Trash();
		componentTrash.linkToInstance(component, {
			trackInstance: false,
		});

		componentTrash.add(() => {
			this.unregisterComponent(component);
		});

		componentTrash.add(
			component.AncestryChanged.Connect((_, parent) => {
				if (!component.IsDescendantOf(ancestor)) {
					componentTrash.destroy();
				}
			}),
		);

		componentTrash.add(
			component.GetPropertyChangedSignal("Name").Connect(() => {
				if (!this.checkName(component)) {
					componentTrash.destroy();
				}
			}),
		);

		EditorComponentsAtom(components);
	}

	private unregisterComponent(component: Instance) {
		const attributes = Attributes<{ _component_id: string | undefined }>(component);
		const id = attributes._component_id;
		attributes._component_id = undefined;

		// never was a component
		if (!id) return;

		const components = { ...EditorComponentsAtom() };
		delete components[id];

		EditorComponentsAtom(components);
	}

	private checkName(instance: Instance) {
		const splitted = instance.Name.split(".");
		return splitted.size() > 1 && splitted[splitted.size() - 1] === "component";
	}

	private getName(instance: Instance) {
		const splitted = instance.Name.split(".");
		splitted.remove(splitted.size() - 1);
		return String.toPascalCase(splitted.join(" ").gsub("(%u)", " %1")[0].gsub("^ ", "")[0]);
	}
}
