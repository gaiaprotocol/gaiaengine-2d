import { TreeNode } from "@common-module/app";
import { Container } from "pixi.js";
import Screen from "./screen/Screen.js";
type WindowEventHandler<ET extends Event, NT extends Node> = (event: ET, node: NT) => any;
export default class Node extends TreeNode {
    parent: Node | undefined;
    children: Node[];
    private _screen;
    container: Container;
    private windowEventMap;
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
    onWindow<ET extends Event>(eventName: string, eventHandler: WindowEventHandler<ET, this>): void;
    offWindow<ET extends Event>(eventName: string, eventHandler: WindowEventHandler<ET, this>): void;
    delete(): void;
}
export {};
//# sourceMappingURL=Node.d.ts.map