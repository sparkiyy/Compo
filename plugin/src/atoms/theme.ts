import { Atom, atom } from "@rbxts/charm";


export const ThemeColors = {
    "MainBackground" : Enum.StudioStyleGuideColor.MainBackground,
    "MainText" : Enum.StudioStyleGuideColor.MainText,
    "ScrollBar" : Enum.StudioStyleGuideColor.ScrollBar,
    "ScrollBarBackground" : Enum.StudioStyleGuideColor.ScrollBarBackground,
    "TabItem" : Enum.StudioStyleGuideColor.TableItem,
    "Button" : Enum.StudioStyleGuideColor.Button,
    "Light" : Enum.StudioStyleGuideColor.Light,
    "Dark" : Enum.StudioStyleGuideColor.Dark
}

type Modifiers = "Default" | "Disabled" | "Hover" | "Pressed" | "Selected"
export type StudioTheme = Record<keyof typeof ThemeColors, Record<Modifiers, Color3>>;

export const ThemeAtom = atom<StudioTheme>() as Atom<StudioTheme>