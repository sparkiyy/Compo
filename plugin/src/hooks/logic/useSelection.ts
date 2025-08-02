import { useAtom } from "@rbxts/react-charm";
import { SelectionAtom } from "atoms/selection";

export default function useSelection() {
    return useAtom(SelectionAtom)
}