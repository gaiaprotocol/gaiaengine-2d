import { DomNode } from "@common-module/app";
import { Renderer } from "pixi.js";
import Node from "../base/Node.js";
import Camera from "./Camera.js";
export default class Screen extends DomNode {
    width: number;
    height: number;
    root: Node;
    camera: Camera;
    protected renderer: Renderer | undefined;
    private animationInterval;
    private beforeTime;
    ratio: number;
    constructor(width: number, height: number, ...nodes: (Node | undefined)[]);
    resize(width: number, height: number, ratio?: number): void;
    updateRootPosition(): void;
    private createRenderer;
    private _tick;
    private _animate;
    resume(): void;
}
//# sourceMappingURL=Screen.d.ts.map