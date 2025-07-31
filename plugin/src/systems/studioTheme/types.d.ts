type Theme = Instance & {
	GetColor(styleGuideColor: Enum.StudioStyleGuideColor, styleGuideModifier?: Enum.StudioStyleGuideModifier): Color3;
};
interface Studio {
	Theme: Theme;
}
