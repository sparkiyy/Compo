import React, { useState } from "@rbxts/react";
import InspectorSection from "./common/inspectorSection";
import useComponent from "hooks/logic/useComponent";
import Padding from "ui/components/padding";
import assets from "assets/assets";
import useTheme from "hooks/visuals/useTheme";
import { EditorComponent } from "atoms/editorComponents";
import { ComponentRealm } from "atoms/editorComponents";
import CheckBox from "ui/components/checkbox";
import SerializedComponentFields from "./serializedFields";

interface Props {
	component: EditorComponent;
	instance: Instance;
}
export default function SerializedComponent({ component, instance }: Props) {
	const [componentState, setActive] = useComponent(component.id, instance);
	const [compact, setCompact] = useState(false);

	const theme = useTheme();
	return (
		<InspectorSection>
			<Padding Padding={new UDim(0, 5)} />
			<uilistlayout FillDirection={"Vertical"} Padding={new UDim(0, 5)} />
			<frame AutomaticSize={"Y"}>
				<uilistlayout FillDirection={"Horizontal"} ItemLineAlignment={"Center"} Padding={new UDim(0, 0)} />

				<frame BackgroundTransparency={1} Size={UDim2.fromOffset(16, 16)}>
					<imagebutton
						Image={assets.caretDown}
						Rotation={compact ? -90 : 0}
						BackgroundTransparency={1}
						ImageColor3={theme.MainText.Default}
						Size={UDim2.fromOffset(16, 16)}
						ImageTransparency={0.5}
						Event={{ MouseButton1Click: () => setCompact((val) => !val) }}
					/>
				</frame>

				<frame AutomaticSize={"XY"} BackgroundTransparency={1}>
					<frame AutomaticSize={"XY"} BackgroundTransparency={1}>
						<uilistlayout
							FillDirection={"Horizontal"}
							Padding={new UDim(0, 5)}
							ItemLineAlignment={"Center"}
						/>
						<imagelabel
							Image={assets.extension}
							BackgroundTransparency={1}
							Size={UDim2.fromOffset(16, 16)}
							ImageColor3={
								component.realm === ComponentRealm.Client
									? Color3.fromHex("#4cbcff")
									: Color3.fromHex("#26d964")
							}
						/>

						<CheckBox checked={componentState.active} onClick={() => setActive(!componentState.active)} />

						<textlabel
							Text={component.name}
							BackgroundTransparency={1}
							TextColor3={theme.MainText.Default}
							AutomaticSize={"XY"}
						/>
					</frame>
				</frame>
			</frame>

			{!compact && (
				<frame AutomaticSize={"Y"} Size={UDim2.fromScale(1, 0)} BackgroundTransparency={1}>
					<Padding Left={new UDim(0, 17)} />
					<SerializedComponentFields component={component} instance={instance} />
				</frame>
			)}
		</InspectorSection>
	);
}
