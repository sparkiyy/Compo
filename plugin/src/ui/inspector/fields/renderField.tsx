import React, { Fragment, useEffect } from "@rbxts/react";
import { EditorComponentField, EditorComponentFieldType } from "atoms/editorComponents";
import StringInspectorField from "./stringField";
import NumberInspectorField from "./numberField";
import BooleanInspectorField from "./booleanField";
import Vector3InspectorField from "./vector3Field";
import Vector2InspectorField from "./vector2Field";

interface Field {
	field: EditorComponentFieldType;
	default: string | number | boolean | Vector3 | Vector2;
}

export default function RenderField({
	name,
	field,
	setFields,
}: {
	name: string;
	field: Field;
	setFields: (value: unknown) => void;
}) {
	switch (field.field) {
		case EditorComponentFieldType.String:
			return (
				<StringInspectorField value={field.default as string} onChange={(value: string) => setFields(value)} />
			);
		case EditorComponentFieldType.Number:
			return (
				<NumberInspectorField value={field.default as number} onChange={(value: number) => setFields(value)} />
			);
		case EditorComponentFieldType.Boolean:
			return (
				<BooleanInspectorField
					value={field.default as boolean}
					onChange={(value: boolean) => setFields(value)}
				/>
			);

		case EditorComponentFieldType.Vector3:
			return (
				<Vector3InspectorField
					value={field.default as Vector3}
					onChange={(value: Vector3) => setFields(value)}
				/>
			);

		case EditorComponentFieldType.Vector2:
			return (
				<Vector2InspectorField
					value={field.default as Vector2}
					onChange={(value: Vector2) => setFields(value)}
				/>
			);
		default:
			return <Fragment />;
	}
}
