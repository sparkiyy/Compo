import React from "@rbxts/react";
import assets from "assets/assets";
import useTheme from "hooks/visuals/useTheme";
import Padding from "ui/components/padding";

export default function AddComponentButton({ OnClick }: { OnClick?: () => void }) {
	const theme = useTheme();
	return (
		<frame BackgroundTransparency={1} AutomaticSize={"XY"}>
			<imagebutton
				BackgroundColor3={theme.Button.Selected}
				AutomaticSize={"XY"}
				Event={{ MouseButton1Click: OnClick }}
			>
				<uicorner CornerRadius={new UDim(0, 5)} />
				<Padding Top={new UDim(0, 5)} Bottom={new UDim(0, 5)} Left={new UDim(0, 30)} Right={new UDim(0, 30)} />
				<uilistlayout FillDirection={"Horizontal"} ItemLineAlignment={"Center"} />
				<imagelabel
					Size={UDim2.fromOffset(12, 12)}
					Image={assets.add}
					BackgroundTransparency={1}
					ImageColor3={theme.MainText.Selected}
				/>
				<textlabel
					Text={"Add Component"}
					BackgroundTransparency={1}
					TextColor3={theme.MainText.Selected}
					AutomaticSize={"XY"}
				/>
			</imagebutton>
		</frame>
	);
}
