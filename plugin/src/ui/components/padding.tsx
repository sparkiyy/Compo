import React from "@rbxts/react";

interface PaddingProps {
    Padding? : UDim,
    Top? : UDim,
    Right? : UDim,
    Bottom? : UDim,
    Left? : UDim
}

export default function Padding({
    Padding,
    Top,
    Right,
    Bottom,
    Left
} : PaddingProps) {
    return (
        <uipadding PaddingBottom={Padding ?? Bottom} PaddingLeft={Padding ?? Left} PaddingRight={Padding ?? Right} PaddingTop={Padding ?? Top}/>
    )
}