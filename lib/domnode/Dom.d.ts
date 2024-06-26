import { DomChild, DomNode } from "@common-module/app";
import GameNode from "../GameNode.js";
import Screen from "../screen/Screen.js";
export default class Dom extends GameNode {
    protected domNode: DomNode;
    constructor(x: number, y: number, tag: string, ...children: DomChild[]);
    set screen(screen: Screen | undefined);
    get screen(): Screen | undefined;
    private beforeLeft;
    private beforeTop;
    step(deltaTime: number): void;
    delete(): void;
}
//# sourceMappingURL=Dom.d.ts.map