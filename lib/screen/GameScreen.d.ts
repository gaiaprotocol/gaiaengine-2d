import { DomNode } from "@common-module/app";
import GameNode from "../core/GameNode.js";
import Camera from "./Camera.js";
import RootNode from "./RootNode.js";
export default class GameScreen extends DomNode {
    width: number;
    height: number;
    private renderer;
    private animationInterval;
    private targetFPS;
    private actualFPS;
    root: RootNode;
    camera: Camera;
    ratio: number;
    constructor(width: number, height: number, ...gameNodes: (GameNode | undefined)[]);
    private createRenderer;
    private update;
    private lastFrameTime;
    private accumulatedTime;
    private animate;
    remove(): void;
}
//# sourceMappingURL=GameScreen.d.ts.map