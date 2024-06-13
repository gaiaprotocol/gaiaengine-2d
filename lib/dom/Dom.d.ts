import { DomChild, DomNode } from "@common-module/app";
import Node from "../base/Node.js";
import Screen from "../screen/Screen.js";
export default class Dom extends Node {
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