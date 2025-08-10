import { atom } from "@rbxts/charm";

export const enum ComponentRealm {
	Client = 1,
	Server = 2,
}
export const enum EditorComponentFieldType {
	String = 1,
	Number = 2,
	Boolean = 3,
	Vector3 = 4,
	Vector2 = 5,
}
export interface EditorComponent {
	instance: ModuleScript;
	name: string;
	realm: ComponentRealm;
	id: string;
	fields?: Record<string, EditorComponentField>;
	isDirty?: boolean;
}

export interface EditorComponentField {
	default: unknown;
	field: EditorComponentFieldType;
}

export interface ComponentBuilder {
	constructor: (instance: Instance, fields: []) => Component;
	fields: Record<string, EditorComponentField>;
}

export interface Component {}
export const EditorComponentsAtom = atom<Record<string, EditorComponent>>({});
