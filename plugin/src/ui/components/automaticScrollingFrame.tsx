import { useEventListener } from "@rbxts/pretty-react-hooks";
import React, { ReactNode, useRef, useState } from "@rbxts/react";

interface Props {
	children?: ReactNode;
	Size?: UDim2;
	Position?: UDim2;
	AnchorPoint?: Vector2;
	BackgroundColor3?: Color3;
	BackgroundTransparency?: number;
	BorderSizePixel?: number;
	LayoutOrder?: number;
	ZIndex?: number;
	Visible?: boolean;
}
export default function AutomaticScrollingFrame({
	children,
	Size,
	Position,
	AnchorPoint,
	BackgroundColor3,
	BackgroundTransparency,
	BorderSizePixel,
	LayoutOrder,
	ZIndex,
	Visible,
}: Props) {
	return (
		<scrollingframe
			Size={Size}
			Position={Position}
			AnchorPoint={AnchorPoint}
			BackgroundColor3={BackgroundColor3}
			BackgroundTransparency={BackgroundTransparency}
			BorderSizePixel={BorderSizePixel}
			LayoutOrder={LayoutOrder}
			ZIndex={ZIndex}
			Visible={Visible}
		>
			{children}
		</scrollingframe>
	);
}
