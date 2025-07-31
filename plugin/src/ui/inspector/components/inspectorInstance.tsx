import React from "@rbxts/react";
import useSelection from "hooks/logic/useSelection";
import InspectorSection from "./common/inspectorSection";
import useTheme from "hooks/visuals/useTheme";
import useInstanceIcon from "hooks/visuals/useInstanceIcon";
export default function InspectorInstance() {
	const selection = useSelection();
	const theme = useTheme();
	const selectionIcon = useInstanceIcon(selection);
	return (
		<InspectorSection>
			<uilistlayout FillDirection={"Horizontal"} ItemLineAlignment={"Center"} Padding={new UDim(0, 5)} />
			<imagelabel BackgroundTransparency={1} Image={selectionIcon} Size={UDim2.fromOffset(16, 16)} />
			<textlabel
				Text={selection?.Name}
				AutomaticSize={"XY"}
				TextColor3={theme.MainText.Default}
				BackgroundTransparency={1}
			/>
		</InspectorSection>
	);
}
