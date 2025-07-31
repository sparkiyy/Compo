import { Logger, OnInit, System } from "@rbxts/comet";
import { StudioTheme, ThemeAtom, ThemeColors } from "atoms/theme";

@System()
export class StudioThemeSystem implements OnInit   {
    onInit () {
        this.onThemeChanged()
        settings().Studio.ThemeChanged.Connect(() => this.onThemeChanged())
    }

    private onThemeChanged() {
        const theme = settings().Studio.Theme

        let themes = {} as StudioTheme;
        for (const [name, color] of pairs(ThemeColors)) {
            const modifiers : Record<string, Color3>= {}
            for (const [_,mod] of ipairs(Enum.StudioStyleGuideModifier.GetEnumItems())) {
                modifiers[mod.Name] = theme.GetColor(color, mod)
            }

            themes[name] = modifiers
        }

        ThemeAtom(themes)
    }
}