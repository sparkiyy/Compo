import React, { Fragment, useEffect, useState } from "@rbxts/react";
import InspectorContainer from "./inspectorContainer";
import useSelection from "hooks/logic/useSelection";
import Padding from "ui/components/padding";
import useTheme from "hooks/visuals/useTheme";
import InspectorInstance from "./inspectorInstance";
import AddComponentButton from "./addComponent";
import Separator from "ui/components/separator";
import InspectorComponentsList from "./inspectorComponentsList";
import InstanceComponents from "./instanceComponents";

export function InspectorView() {
	const theme = useTheme();
	const selection = useSelection();
	const [showComponentsList, setShowComponentsList] = useState(false);

	useEffect(() => {
		setShowComponentsList(false);
	}, [selection]);

	return (
		<frame Size={UDim2.fromScale(1, 1)} BackgroundTransparency={1}>
			<Padding Padding={new UDim(0, 6)} />
			<InspectorContainer>
				<uilistlayout FillDirection={"Vertical"} Padding={new UDim(0, 5)} HorizontalAlignment={"Center"} />
				{selection && (
					<Fragment>
						<InspectorInstance />
						<Separator />
						<InstanceComponents Instance={selection} />
						<Separator />
						<AddComponentButton OnClick={() => setShowComponentsList((previous) => !previous)} />
					</Fragment>
				)}
			</InspectorContainer>

			{showComponentsList && selection && (
				<InspectorComponentsList instance={selection} close={() => setShowComponentsList(false)} />
			)}
		</frame>
	);
}
