import React, { Fragment } from "@rbxts/react";
import useInstanceComponents from "hooks/logic/useInstanceComponents";
import InspectorSection from "./common/inspectorSection";
import Padding from "ui/components/padding";
import useTheme from "hooks/visuals/useTheme";
import { ComponentRealm } from "atoms/editorComponents";
import assets from "assets/assets";
import CheckBox from "ui/components/checkbox";
import useComponent from "hooks/logic/useComponent";
import SerializedComponent from "./serializedComponent";
export default function InstanceComponents({ Instance }: { Instance: Instance }) {
	const [components] = useInstanceComponents(Instance);
	const theme = useTheme();
	return (
		<frame BackgroundTransparency={1} AutomaticSize={"Y"} Size={UDim2.fromScale(1, 0)}>
			<uilistlayout Padding={new UDim(0, 5)} FillDirection={"Vertical"} />
			{components.map((component) => {
				return <SerializedComponent component={component} instance={Instance} key={component.id} />;
			})}
		</frame>
	);
}
