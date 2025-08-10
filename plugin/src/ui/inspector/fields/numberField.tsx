import React, { Fragment } from "@rbxts/react";
import useTheme from "hooks/visuals/useTheme";
import Padding from "ui/components/padding";

export default function NumberInspectorField({
	value,
	onChange,
}: {
	value: number;
	onChange: (value: number) => void;
}) {
	const theme = useTheme();

	return (
		<textbox
			Text={tostring(value)}
			TextColor3={theme.MainText.Default}
			BackgroundColor3={theme.Dark.Default}
			AutomaticSize={"XY"}
			BorderSizePixel={0}
			TextXAlignment={"Left"}
			ClearTextOnFocus={false}
			Event={{
				FocusLost: (rbx) => {
					const num = tonumber(rbx.Text.gsub("[^%d%.-]", "")[0])! ?? 0;
					rbx.Text = tostring(num);
					onChange?.(num);
				},
			}}
		>
			<uicorner CornerRadius={new UDim(0, 5)} />
			<uiflexitem FlexMode={"Fill"} />
			<Padding Padding={new UDim(0, 3)} />
		</textbox>
	);
}
