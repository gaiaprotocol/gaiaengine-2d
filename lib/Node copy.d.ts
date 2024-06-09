import { TreeNode } from "@common-module/app";
import { Container } from "pixi.js";
import Screen from "./screen/Screen.js";
export default class Node<T extends Container = Container> extends TreeNode {
    private x;
    private y;
    parent: Node | undefined;
    children: Node[];
    private visible;
    private _screen;
    private _container;
    constructor(x: number, y: number);
    set screen(screen: Screen | undefined);
    get screen(): Screen | undefined;
    protected set container(container: T | undefined);
    protected get container(): T | undefined;
    appendTo(node: Node, index?: number): this;
    step(deltaTime: number): void;
    setPosition(x: number, y: number): void;
    hide(): void;
    show(): void;
    delete(): void;
}
//# sourceMappingURL=Node%20copy.d.ts.map