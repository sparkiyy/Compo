import React, { Fragment } from "@rbxts/react";
import useTheme from "hooks/visuals/useTheme";
import Padding from "ui/components/padding";

export default function Vector2InspectorField({
	value,
	onChange,
}: {
	value: Vector2;
	onChange: (value: Vector2) => void;
}) {
	const theme = useTheme();
	return (
		<frame AutomaticSize={"XY"} BackgroundTransparency={1}>
			<uiflexitem FlexMode={"Fill"} />
			<uilistlayout FillDirection={"Horizontal"} Padding={new UDim(0, 3)} ItemLineAlignment={"Center"} />

			<textlabel AutomaticSize={"XY"} BackgroundTransparency={1} Text={"X"} TextColor3={theme.MainText.Default} />
			<textbox
				Text={tostring(value.X)}
				TextColor3={theme.MainText.Default}
				AutomaticSize={"Y"}
				BackgroundColor3={theme.Dark.Default}
				TextXAlignment={"Left"}
				ClearTextOnFocus={false}
				ClipsDescendants
				Event={{
					FocusLost: (rbx) => {
						const num = tonumber(rbx.Text.gsub("[^%d%.-]", "")[0])! ?? 0;
						onChange(new Vector2(num, value.Y));
					},
				}}
			>
				<uicorner CornerRadius={new UDim(0, 5)} />
				<uiflexitem FlexMode={"Fill"} />
				<Padding Padding={new UDim(0, 3)} />
			</textbox>

			<textlabel AutomaticSize={"XY"} BackgroundTransparency={1} Text={"Y"} TextColor3={theme.MainText.Default} />
			<textbox
				Text={tostring(value.Y)}
				TextColor3={theme.MainText.Default}
				AutomaticSize={"Y"}
				BackgroundColor3={theme.Dark.Default}
				TextXAlignment={"Left"}
				ClearTextOnFocus={false}
				ClipsDescendants
				Event={{
					FocusLost: (rbx) => {
						const num = tonumber(rbx.Text.gsub("[^%d%.-]", "")[0])! ?? 0;
						onChange(new Vector2(value.X, num));
					},
				}}
			>
				<uicorner CornerRadius={new UDim(0, 5)} />
				<uiflexitem FlexMode={"Fill"} />
				<Padding Padding={new UDim(0, 3)} />
			</textbox>
		</frame>
	);
}
