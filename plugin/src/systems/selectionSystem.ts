import { Dependency, OnInit, Studio, System } from "@rbxts/comet";
import { SelectionAtom } from "atoms/selection";

@System()
export class SelectionSystem implements OnInit{
    private studio = Dependency(Studio)
    onInit(): void {
        SelectionAtom(this.studio.getSelection()[0])
        this.studio.onSelectionChanged((newSelection) => {
            SelectionAtom(newSelection[0])
        })
    }
}