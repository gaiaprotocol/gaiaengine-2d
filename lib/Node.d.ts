import { TreeNode } from "@common-module/app";
import { Container } from "pixi.js";
import Screen from "../screen/Screen.js";
export default class Node extends TreeNode {
    parent: Node | undefined;
    children: Node[];
    private _screen;
    container: Container;
    constructor(x: number, y: number);
    setPosition(x: number, y: number): void;
    set scaleX(scaleX: number);
    get scaleX(): number;
    hide(): void;
    show(): void;
    step(deltaTime: number): void;
    set screen(screen: Screen | undefined);
    get screen(): Screen | undefined;
    appendTo(node: Node, index?: number): this;
    delete(): void;
}
//# sourceMappingURL=Node.d.ts.map