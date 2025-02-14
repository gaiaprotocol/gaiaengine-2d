import { DomNode } from "@common-module/app";
import { Container } from "pixi.js";
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
    pixelated?: boolean;
}
export default class GameScreen extends DomNode {
    private _options;
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
    constructor(_options: GameScreenOptions);
    resize(width: number, height: number, ratio?: number): void;
    private createRenderer;
    updateRootNodePosition(): void;
    private update;
    private lastFrameTime;
    private accumulatedTime;
    private animate;
    appendToLayer(pixiContainer: Container, layerName: string): void;
    remove(): void;
}
export {};
//# sourceMappingURL=GameScreen.d.ts.map