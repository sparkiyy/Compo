import { useAtom } from "@rbxts/react-charm";
import { EditorComponentsAtom } from "atoms/editorComponents";

export default function useEditorComponets() {
	return useAtom(EditorComponentsAtom);
}
