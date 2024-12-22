import { DomNode } from "@common-module/app";
import Camera from "./Camera.js";
import RootNode from "./RootNode.js";
interface GameScreenOptions {
    width: number;
    height: number;
    backgroundColor?: number;
}
export default class GameScreen extends DomNode {
    private renderer;
    private animationInterval;
    private targetFPS;
    private actualFPS;
    root: RootNode;
    camera: Camera;
    width: number;
    height: number;
    ratio: number;
    private backgroundColor;
    constructor(options: GameScreenOptions);
    resize(width: number, height: number, ratio?: number): void;
    private createRenderer;
    updateRootNodePosition(): void;
    private update;
    private lastFrameTime;
    private accumulatedTime;
    private animate;
    remove(): void;
}
export {};
//# sourceMappingURL=GameScreen.d.ts.map