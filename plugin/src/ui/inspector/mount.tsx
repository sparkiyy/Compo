import { createPortal, createRoot } from "@rbxts/react-roblox";
import App from "./app";
import React, { StrictMode } from "@rbxts/react";
export function MountInspector(parent: Instance) {
    const mountRoot = createRoot(parent)
    mountRoot.render(<StrictMode>{createPortal(<App />, parent)}</StrictMode>)

    return () => mountRoot.unmount()
}