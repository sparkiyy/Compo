import { useAtom } from "@rbxts/react-charm";
import { ThemeAtom } from "atoms/theme";


export default function useTheme() {
    return useAtom(ThemeAtom)
}