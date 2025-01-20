import { DomNode } from "@common-module/app";
import GameObject from "../core/GameObject.js";
import Camera from "./Camera.js";
interface GameScreenOptions {
    width: number;
    height: number;
    backgroundColor?: number;
    layers?: {
        name: string;
        drawingOrder: number;
    }[];
}
export default class GameScreen extends DomNode {
    private renderer;
    private animationInterval;
    private targetFPS;
    private actualFPS;
    private superRoot;
    private layers;
    camera: Camera;
    root: GameObject;
    width: number;
    height: number;
    ratio: number;
    private backgroundColor;
    constructor(options: GameScreenOptions);
    resize(width: number, height: number, ratio?: number): void;
    private createRenderer;
    updateSuperRootNodePosition(): void;
    private update;
    private lastFrameTime;
    private accumulatedTime;
    private animate;
    remove(): void;
}
export {};
//# sourceMappingURL=GameScreen.d.ts.map