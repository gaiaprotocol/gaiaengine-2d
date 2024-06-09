import { TreeNode } from "@common-module/app";
import { Container } from "pixi.js";
import Screen from "./screen/Screen.js";
export default class GameNode<T extends Container = Container> extends TreeNode {
    container: T;
    private _screen;
    parent: GameNode | undefined;
    children: GameNode[];
    constructor(x: number, y: number, container?: T);
    set screen(screen: Screen | undefined);
    get screen(): Screen | undefined;
    appendTo(node: GameNode, index?: number): this;
    step(deltaTime: number): void;
    setPosition(x: number, y: number): void;
    hide(): void;
    show(): void;
    delete(): void;
}
//# sourceMappingURL=GameNode.d.ts.map