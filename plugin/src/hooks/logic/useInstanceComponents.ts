import { String } from "@rbxts/jsnatives";
import { useCallback, useEffect, useState } from "@rbxts/react";
import { CollectionService } from "@rbxts/services";
import { Trash } from "@rbxts/trash";
import { EditorComponent, EditorComponentsAtom } from "atoms/editorComponents";
import { COMPONENT_ADDED_FLAG, COMPONENT_PREFIX, COMPONENT_REMOVED_FLAG } from "constants";

export default function useInstanceComponents(instance: Instance) {
	const [components, setComponents] = useState<EditorComponent[]>([]);

	useEffect(() => {
		setComponents([]);
		function checkTag(tag: string) {
			const isComponentTag = String.startsWith(tag, COMPONENT_PREFIX);
			if (!isComponentTag) return;

			const id = String.split(tag, ":")[1];
			return EditorComponentsAtom()[id];
		}

		function update() {
			const components: EditorComponent[] = [];
			for (const [_, tag] of ipairs(instance.GetTags())) {
				const component = checkTag(tag);
				if (!component) continue;
				components.push(component);
			}

			setComponents(components);
		}

		const trash = new Trash();
		trash.add(
			CollectionService.GetInstanceAddedSignal(COMPONENT_ADDED_FLAG).Connect((added) => {
				if (instance !== added) return;
				update();
			}),
		);

		trash.add(
			CollectionService.GetInstanceAddedSignal(COMPONENT_REMOVED_FLAG).Connect((added) => {
				if (instance !== added) return;
				update();
			}),
		);

		update();
		return () => trash.destroy();
	}, [instance]);

	return $tuple(
		// Components
		components,
		// setComponent
		useCallback(
			(id: string) => {
				CollectionService.AddTag(instance, COMPONENT_PREFIX + id);
				// this fires a new tag added change to the hook
				instance.AddTag(COMPONENT_ADDED_FLAG);
				instance.RemoveTag(COMPONENT_ADDED_FLAG);
			},
			[instance],
		),
		// removeComponent
		useCallback(
			(id: string) => {
				CollectionService.RemoveTag(instance, COMPONENT_PREFIX + id);
				// this fires a new tag removed change to the hook
				instance.AddTag(COMPONENT_REMOVED_FLAG);
				instance.RemoveTag(COMPONENT_REMOVED_FLAG);
			},
			[instance],
		),
	);
}
