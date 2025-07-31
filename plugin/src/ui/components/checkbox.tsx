import React from "@rbxts/react";
import { checkmark } from "assets/assets";
import useTheme from "hooks/visuals/useTheme";

interface Props {
	checked: boolean;
}

export default function CheckBox(props: Props) {
	const theme = useTheme();
	return (
		<imagebutton Size={UDim2.fromOffset(14, 14)} BackgroundColor3={theme.Dark.Default} BorderSizePixel={0}>
			<imagelabel
				Image={checkmark}
				ImageColor3={theme.MainText.Default}
				Size={UDim2.fromOffset(12, 12)}
				Position={UDim2.fromScale(0.5, 0.5)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
			/>
		</imagebutton>
	);
}
