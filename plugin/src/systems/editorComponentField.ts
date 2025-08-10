import { COMPONENT_ID } from "constants";
import { Dependency, OnEnd, OnStart, Studio, System } from "@rbxts/comet";
import { ComponentBuilder, EditorComponent, EditorComponentField, EditorComponentsAtom } from "atoms/editorComponents";
import { sandboxload } from "utility/sandboxLoad";
import { effect } from "@rbxts/charm";
import { Trash } from "@rbxts/trash";
import { RunService } from "@rbxts/services";
const ScriptEditorService = game.GetService("ScriptEditorService");

@System()
export class EditorComponentFieldSystem implements OnStart, OnEnd {
	private Studio = Dependency(Studio);
	private fetchingTrash!: Trash;
	onStart() {
		this.startFetching();
	}
	onEnd(): void {
		this.stopFetching();
	}
	public startFetching() {
		this.fetchingTrash = new Trash();
		this.fetchingTrash.add(
			ScriptEditorService.TextDocumentDidChange.Connect((document) => {
				const documentScript = document.GetScript();
				if (!documentScript) return;

				const id = documentScript.GetAttribute(COMPONENT_ID) as string;
				const editorComponents = { ...EditorComponentsAtom() };

				const editorComponent = editorComponents[id];
				if (!editorComponent) return;
				if (editorComponent.isDirty) return;

				editorComponent.isDirty = true;
				EditorComponentsAtom(editorComponents);
			}),
		);

		//this.fetchingTrash.add(StudioService.GetPropertyChangedSignal("ActiveScript").Connect(() => this.updateFields()));
		this.fetchingTrash.add(ScriptEditorService.TextDocumentDidClose.Connect(() => this.updateFields()));
	}

	public stopFetching() {
		this.fetchingTrash?.destroy();
	}

	public getFields(component: ModuleScript): Record<string, EditorComponentField> | undefined {
		try {
			let builder: ComponentBuilder;
			// sandboxload fails if you're in run mode, so, change sandboxload() for require()
			if (RunService.IsRunning()) builder = require(component) as ComponentBuilder;
			else builder = (sandboxload(component.Source, component) as () => ComponentBuilder)();

			return builder.fields;
		} catch (e) {
			warn(
				`[🟠WARNING] Tried to read ${component.Name}, but an error ocurred: ${e}. Can't get component's fields`,
			);
			return undefined;
		}
	}

	public updateFields() {
		const editorComponents = { ...EditorComponentsAtom() };
		for (const [_, component] of pairs(editorComponents)) {
			if (component.isDirty) {
				component.isDirty = false;
				const fieds = this.getFields(component.instance);
				component.fields = fieds;
			}
		}

		EditorComponentsAtom(editorComponents);
	}
}
