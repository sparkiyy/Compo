import React, { Fragment } from "@rbxts/react";
import useInstanceComponents from "hooks/logic/useInstanceComponents";
import InspectorSection from "./common/inspectorSection";
import Padding from "ui/components/padding";
import useTheme from "hooks/visuals/useTheme";
import { ComponentRealm } from "atoms/editorComponents";
import assets from "assets/assets";
import CheckBox from "ui/components/checkbox";
export default function InstanceComponents({ Instance }: { Instance: Instance }) {
	const [components] = useInstanceComponents(Instance);
	const theme = useTheme();
	return (
		<frame BackgroundTransparency={1} AutomaticSize={"Y"} Size={UDim2.fromScale(1, 0)}>
			<uilistlayout Padding={new UDim(0, 5)} FillDirection={"Vertical"} />
			{components.map((component) => {
				return (
					<InspectorSection>
						<Padding Padding={new UDim(0, 5)} />
						<uilistlayout
							FillDirection={"Horizontal"}
							ItemLineAlignment={"Center"}
							Padding={new UDim(0, 10)}
						/>

						<imagebutton
							Image={assets.caretDown}
							BackgroundTransparency={1}
							ImageColor3={theme.MainText.Default}
							Size={UDim2.fromOffset(16, 16)}
							ImageTransparency={0.5}
						/>

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

							<CheckBox checked={true} />

							<textlabel
								Text={component.name}
								BackgroundTransparency={1}
								TextColor3={theme.MainText.Default}
								AutomaticSize={"XY"}
							/>
						</frame>
					</InspectorSection>
				);
			})}
		</frame>
	);
}
