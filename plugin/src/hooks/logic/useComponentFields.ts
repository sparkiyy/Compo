import { useCallback, useEffect, useState } from "@rbxts/react";
import { EditorComponentField } from "atoms/editorComponents";
import useEditorComponets from "./useEditorComponents";
import { COMPONENT_FIELD } from "constants";
import { useEventListener } from "@rbxts/pretty-react-hooks";
import { String } from "@rbxts/jsnatives";
import { string } from "@rbxts/react/src/prop-types";

export default function useComponentFields(componentID: string, instance: Instance) {
	const [fields, setFields] = useState<Record<string, EditorComponentField>>({});
	const editorComponents = useEditorComponets();

	useEffect(() => {
		const component = editorComponents[componentID]!;
		const fields: Record<string, EditorComponentField> = {};

		if (!component.fields) return;
		for (const [name, field] of pairs(component.fields)) {
			const expectedAttribute = COMPONENT_FIELD + component.id + name;
			let value: unknown = instance.GetAttribute(expectedAttribute);
			if (value === undefined) {
				instance.SetAttribute(expectedAttribute, field.default as never);
				value = field.default;
			}
			fields[name] = { ...field, default: value };
		}
		setFields(fields);
	}, [editorComponents, componentID, instance]);

	useEventListener(instance.AttributeChanged, (name: string) => {
		const component = editorComponents[componentID]!;
		const prefix = COMPONENT_FIELD + component.id;
		if (!String.startsWith(name, prefix)) return;
		const refinatedName = name.sub(prefix.size() + 1);

		if (component.fields![refinatedName]) {
			const field = component.fields![refinatedName];
			const value = instance.GetAttribute(name);
			setFields((fields) => ({ ...fields, [refinatedName]: { ...field, default: value } }));
		}
	});

	return {
		fields: fields,
		setFields: useCallback(
			(field: string, value: unknown) =>
				instance.SetAttribute(COMPONENT_FIELD + componentID + field, value as never),
			[componentID, instance],
		),
	};
}
