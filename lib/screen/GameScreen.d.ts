import { DomNode } from "@common-module/app";
import GameObject from "../core/GameObject.js";
import Camera from "./Camera.js";
export default class GameScreen extends DomNode {
    width: number;
    height: number;
    private renderer;
    private animationInterval;
    root: GameObject;
    camera: Camera;
    ratio: number;
    constructor(width: number, height: number);
    private createRenderer;
    private update;
    private previousTime;
    private animate;
}
//# sourceMappingURL=GameScreen.d.ts.map