import { DomNode } from "@common-module/app";
import GameNode from "../core/GameNode.js";
import GameObject from "../core/GameObject.js";
export default class GameScreen extends DomNode {
    width: number;
    height: number;
    private renderer;
    root: GameObject;
    constructor(width: number, height: number, ...nodes: (GameNode | undefined)[]);
    private createRenderer;
}
//# sourceMappingURL=GameScreen.d.ts.map