import React from "@rbxts/react";
import useTheme from "hooks/visuals/useTheme";

export default function Separator() {
	const theme = useTheme();
	return (
		<frame Size={new UDim2(1, 0, 0, 1)} BackgroundColor3={theme.Dark.Default} BackgroundTransparency={0.25}>
			<uicorner CornerRadius={new UDim(1, 0)} />
		</frame>
	);
}
