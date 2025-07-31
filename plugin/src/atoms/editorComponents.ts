import { atom } from "@rbxts/charm";

export const enum ComponentRealm {
	Client = 1,
	Server = 2,
}

export interface EditorComponent {
	instance: Instance;
	name: string;
	realm: ComponentRealm;
	id: string;
}
export const EditorComponentsAtom = atom<Record<string, EditorComponent>>({});
