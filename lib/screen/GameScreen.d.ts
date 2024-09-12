import { DomNode } from "@common-module/app";
import GameObject from "../core/GameObject.js";
export default class GameScreen extends DomNode {
    width: number;
    height: number;
    private renderer;
    private animationInterval;
    root: GameObject;
    constructor(width: number, height: number);
    private createRenderer;
    private animate;
}
//# sourceMappingURL=GameScreen.d.ts.map