import React, { Fragment } from "@rbxts/react";
import useTheme from "hooks/visuals/useTheme";
import Padding from "ui/components/padding";

export default function StringInspectorField({
	value,
	onChange,
}: {
	value: string;
	onChange: (value: string) => void;
}) {
	const theme = useTheme();
	return (
		<textbox
			Text={value}
			TextColor3={theme.MainText.Default}
			BackgroundColor3={theme.Dark.Default}
			AutomaticSize={"XY"}
			BorderSizePixel={0}
			TextXAlignment={"Left"}
			ClearTextOnFocus={false}
			Change={{
				Text: (rbx) => {
					onChange(rbx.Text);
				},
			}}
		>
			<uicorner CornerRadius={new UDim(0, 5)} />
			<uiflexitem FlexMode={"Fill"} />
			<Padding Padding={new UDim(0, 3)} />
		</textbox>
	);
}
