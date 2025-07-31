import { useMemo } from "@rbxts/react";

const StudioService = game.GetService("StudioService");

export default function useInstanceIcon(instance: Instance | undefined) {
	return useMemo(() => {
		if (!instance) return "";
		const icon = (StudioService.GetClassIcon(instance.ClassName) as { Image: string }).Image;
		return icon;
	}, [instance]);
}
