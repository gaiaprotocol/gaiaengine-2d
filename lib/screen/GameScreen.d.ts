import { DomNode } from "@common-module/app";
import Camera from "./Camera.js";
import RootNode from "./RootNode.js";
export default class GameScreen extends DomNode {
    width: number;
    height: number;
    private renderer;
    private animationInterval;
    root: RootNode;
    camera: Camera;
    ratio: number;
    constructor(width: number, height: number);
    private createRenderer;
    private update;
    private previousTime;
    private animate;
}
//# sourceMappingURL=GameScreen.d.ts.map