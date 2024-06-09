import { TreeNode } from "@common-module/app";
import { Container } from "pixi.js";
import Screen from "./screen/Screen.js";
export default class Node extends TreeNode {
    parent: Node | undefined;
    children: Node[];
    private _screen;
    container: Container;
    constructor(x: number, y: number);
    set screen(screen: Screen | undefined);
    get screen(): Screen | undefined;
    appendTo(node: Node, index?: number): this;
    step(deltaTime: number): void;
    setPosition(x: number, y: number): void;
    hide(): void;
    show(): void;
    delete(): void;
}
//# sourceMappingURL=Node.d.ts.map