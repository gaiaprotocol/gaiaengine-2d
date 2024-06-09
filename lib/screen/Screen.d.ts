import { DomNode } from "@common-module/app";
import { Renderer } from "pixi.js";
import Node from "../Node.js";
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
    constructor(width: number, height: number, ...nodes: Node[]);
    protected resize(width: number, height: number, ratio: number): void;
    private createRenderer;
    private step;
    private tic;
    resume(): void;
}
//# sourceMappingURL=Screen.d.ts.map