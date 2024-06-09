import { TreeNode } from "@common-module/app";
import { Container } from "pixi.js";
import Screen from "./screen/Screen.js";
export default class GameNode<T extends Container = Container> extends TreeNode {
    container: T;
    private _screen;
    protected children: GameNode[];
    constructor(container?: T);
    set screen(screen: Screen | undefined);
    get screen(): Screen | undefined;
    appendTo(node: GameNode, index?: number): this;
    step(deltaTime: number): void;
}
//# sourceMappingURL=GameNode.d.ts.map