import React, { ReactNode } from "@rbxts/react";
import useTheme from "hooks/visuals/useTheme";
export default function InspectorContainer({ children }: { children: ReactNode }) {
	const theme = useTheme();
	return (
		<scrollingframe
			Size={UDim2.fromScale(1, 1)}
			BorderSizePixel={0}
			ScrollBarImageColor3={theme.ScrollBar.Default}
			ScrollBarThickness={8}
			BackgroundColor3={theme.MainBackground.Default}
			AutomaticCanvasSize={"Y"}
			CanvasSize={UDim2.fromScale(0, 0)}
		>
			{children}
		</scrollingframe>
	);
}
