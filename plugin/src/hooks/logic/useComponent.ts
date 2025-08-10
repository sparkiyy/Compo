import { useEventListener } from "@rbxts/pretty-react-hooks";
import React, { useCallback, useEffect, useState } from "@rbxts/react";
import { act } from "@rbxts/react-roblox";
import { COMPONENT_ACTIVE } from "constants";

interface ComponentState {
	active: boolean;
}

export default function useComponent(id: string, instance: Instance) {
    const activeAttributeName = COMPONENT_ACTIVE + id;
	const [state, setState] = useState<ComponentState>({ active: true });
	
    useEffect(() => {
		let active = instance.GetAttribute(activeAttributeName) as boolean | undefined;
		if (active === undefined) {
			instance.SetAttribute(activeAttributeName, true);
			active = true;
		}
		setState({ active: active });
	}, []);

	useEventListener(instance.GetAttributeChangedSignal(activeAttributeName), () => {
		setState({ active: instance.GetAttribute(activeAttributeName) as boolean });
	});

	return $tuple(
		state,
		useCallback((active: boolean) => instance.SetAttribute(activeAttributeName, active), [instance]),
	);
}
