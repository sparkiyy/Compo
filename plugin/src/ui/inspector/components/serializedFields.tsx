import { Object, String } from "@rbxts/jsnatives";
import React, { Fragment, useEffect } from "@rbxts/react";
import { EditorComponent, EditorComponentFieldType } from "atoms/editorComponents";
import useTheme from "hooks/visuals/useTheme";
import useComponentFields from "hooks/logic/useComponentFields";
import RenderField from "../fields/renderField";

export default function SerializedComponentFields({
	component,
	instance,
}: {
	component: EditorComponent;
	instance: Instance;
}) {
	const theme = useTheme();
	const { fields, setFields } = useComponentFields(component.id, instance);
	return (
		<frame BackgroundTransparency={1} AutomaticSize={"XY"} Size={UDim2.fromScale(1, 0)}>
			<uilistlayout FillDirection={"Vertical"} Padding={new UDim(0, 5)} SortOrder={"Name"} />
			{component.fields
				? Object.entries(fields).map(([name, field]) => {
						return (
							<frame
								BackgroundTransparency={1}
								AutomaticSize={"XY"}
								Size={UDim2.fromScale(1, 0)}
								key={name}
							>
								<uilistlayout
									FillDirection={"Horizontal"}
									ItemLineAlignment={"Center"}
									Padding={new UDim(0, 5)}
								/>
								<textlabel
									Text={name}
									BackgroundTransparency={1}
									TextColor3={theme.MainText.Default}
									AutomaticSize={"XY"}
									Size={UDim2.fromOffset(100)}
									TextXAlignment={"Left"}
								/>

								<RenderField
									name={name}
									field={field as never}
									setFields={(val) => setFields(name, val)}
								/>
							</frame>
						);
					})
				: undefined}
		</frame>
	);
}
