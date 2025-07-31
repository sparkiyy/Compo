import React from "@rbxts/react";
import useTheme from "hooks/visuals/useTheme";

export default function Separator() {
	const theme = useTheme();
	return (
		<frame Size={new UDim2(1, -15, 0, 1)} BackgroundColor3={theme.TabItem.Default}>
			<uicorner CornerRadius={new UDim(1, 0)} />
		</frame>
	);
}
