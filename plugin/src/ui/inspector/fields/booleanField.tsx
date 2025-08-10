import React, { Fragment, useEffect } from "@rbxts/react";
import useTheme from "hooks/visuals/useTheme";
import CheckBox from "ui/components/checkbox";
import Padding from "ui/components/padding";

export default function BooleanInspectorField({
	value,
	onChange,
}: {
	value: boolean;
	onChange: (value: boolean) => void;
}) {
	return <CheckBox checked={value} onClick={() => onChange?.(!value)} />;
}
