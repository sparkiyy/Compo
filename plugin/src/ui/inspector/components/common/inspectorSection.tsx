import React, { ReactNode } from "@rbxts/react";
import useTheme from "hooks/visuals/useTheme";
import Padding from "ui/components/padding";

export default function InspectorSection({ children, color }: { children: ReactNode; color?: Color3 }) {
	const theme = useTheme();
	return (
		<frame AutomaticSize={"Y"} Size={new UDim2(1, 0, 0, 0)} BackgroundColor3={color ?? theme.TabItem.Default}>
			<Padding Padding={new UDim(0, 5)} />
			<uicorner CornerRadius={new UDim(0, 5)} />
			<uistroke Thickness={1} Color={theme.Dark.Default} Transparency={0.25} />
			{children}
		</frame>
	);
}
