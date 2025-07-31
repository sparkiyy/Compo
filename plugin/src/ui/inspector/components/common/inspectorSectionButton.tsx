import React, { ReactNode, useEffect, useState } from "@rbxts/react";
import useTheme from "hooks/visuals/useTheme";
import Padding from "ui/components/padding";

export default function InspectorSectionButton({
	Selected,
	OnClick,
	children,
}: {
	children: ReactNode;
	OnClick?: () => void;
	Selected?: boolean;
}) {
	const theme = useTheme();
	const [color, setColor] = useState(Selected ? theme.Button.Selected : theme.Button.Default);

	useEffect(() => {
		setColor(Selected ? theme.Button.Selected : theme.Button.Default);
	}, [Selected, theme]);
	return (
		<imagebutton
			AutoButtonColor={false}
			AutomaticSize={"Y"}
			Size={new UDim2(1, 0, 0, 0)}
			BackgroundColor3={color}
			Event={{
				MouseEnter: () => setColor(Selected ? theme.Button.Selected : theme.Button.Hover),
				MouseLeave: () => setColor(Selected ? theme.Button.Selected : theme.Button.Default),
				MouseButton1Down: () => setColor(Selected ? theme.Button.Selected : theme.Button.Pressed),
				MouseButton1Up: () => setColor(Selected ? theme.Button.Selected : theme.Button.Hover),
				MouseButton1Click: OnClick,
			}}
		>
			<Padding Padding={new UDim(0, 5)} />
			<uicorner CornerRadius={new UDim(0, 5)} />
			{children}
		</imagebutton>
	);
}
