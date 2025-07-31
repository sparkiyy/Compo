import { Object, String } from "@rbxts/jsnatives";
import React, { Fragment, useMemo, useState } from "@rbxts/react";
import useEditorComponets from "hooks/logic/useEditorComponents";
import useTheme from "hooks/visuals/useTheme";
import Padding from "ui/components/padding";
import assets from "assets/assets";
import { ComponentRealm } from "atoms/editorComponents";
import InspectorSectionButton from "./common/inspectorSectionButton";
import useInstanceComponents from "hooks/logic/useInstanceComponents";

export default function InspectorComponentsList({ close, instance }: { close: () => void; instance: Instance }) {
	const [search, setSearch] = useState("");
	const theme = useTheme();
	const [components, setComponent] = useInstanceComponents(instance);
	const editorComponents = useEditorComponets();
	const filteredEditorComponents = useMemo(() => {
		return Object.values(editorComponents!).filter((component) =>
			String.includes(component.name.lower(), search.lower()),
		);
	}, [editorComponents, search]);

	return (
		<Fragment>
			<imagebutton
				Size={new UDim2(2, 0, 2, 0)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				Position={new UDim2(0.5, 0, 0.5, 0)}
				BackgroundTransparency={1}
				Event={{
					MouseButton1Click: close,
				}}
			/>
			<imagebutton
				AutoButtonColor={false}
				Size={new UDim2(1, 0, 1, 0)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				Position={UDim2.fromScale(0.5, 0.5)}
				BackgroundColor3={theme.TabItem.Default}
			>
				<uicorner CornerRadius={new UDim(0, 5)} />
				<uisizeconstraint MaxSize={new Vector2(350, 425)} />
				<uistroke Color={theme.TabItem.Hover} />
				<uilistlayout FillDirection={"Vertical"} HorizontalFlex={"Fill"} Padding={new UDim(0, 5)} />
				<Padding Padding={new UDim(0, 5)} />

				<frame AutomaticSize={"Y"} BackgroundTransparency={1}>
					<Padding Padding={new UDim(0, 5)} />
					<uilistlayout
						FillDirection={"Horizontal"}
						HorizontalFlex={"Fill"}
						Padding={new UDim(0, 5)}
						ItemLineAlignment={"Center"}
					/>
					<imagelabel
						Size={UDim2.fromOffset(12, 12)}
						BackgroundTransparency={1}
						Image={assets.search}
						ImageColor3={theme.MainText.Default}
					/>
					<textbox
						AutomaticSize={"Y"}
						Size={new UDim2(1, 0, 0, 0)}
						BackgroundTransparency={0}
						BackgroundColor3={theme.Dark.Default}
						TextColor3={theme.MainText.Default}
						Text={""}
						TextXAlignment={"Left"}
						Change={{
							Text: (box) => setSearch(box.Text),
						}}
					>
						<Padding Padding={new UDim(0, 3)} />
						<uicorner CornerRadius={new UDim(0, 5)} />
					</textbox>
				</frame>

				<scrollingframe
					AutomaticCanvasSize={"Y"}
					Size={new UDim2(1, 0, 1, 0)}
					CanvasSize={new UDim2(1, 0, 0, 0)}
					BackgroundTransparency={1}
				>
					<Padding Padding={new UDim(0, 1)} />
					<uilistlayout FillDirection={"Vertical"} HorizontalFlex={"Fill"} Padding={new UDim(0, 5)} />

					{filteredEditorComponents.map((component) => (
						<InspectorSectionButton OnClick={() => setComponent(component.id)}>
							<uistroke
								Color={components.includes(component) ? theme.Button.Selected : theme.Dark.Default}
							/>
							<uilistlayout
								FillDirection={"Horizontal"}
								ItemLineAlignment={"Center"}
								Padding={new UDim(0, 5)}
							/>
							<imagelabel
								Image={assets.extension}
								BackgroundTransparency={1}
								Size={UDim2.fromOffset(16, 16)}
								ImageColor3={
									component.realm === ComponentRealm.Client
										? Color3.fromHex("#4cbcff")
										: Color3.fromHex("#26d964")
								}
							/>
							<textlabel
								BackgroundTransparency={1}
								Text={component.name}
								AutomaticSize={"XY"}
								TextColor3={
									components.includes(component) ? theme.MainText.Selected : theme.MainText.Default
								}
							/>
						</InspectorSectionButton>
					))}
				</scrollingframe>
			</imagebutton>
		</Fragment>
	);
}
