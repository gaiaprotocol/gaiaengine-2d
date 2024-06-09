import { DomNode } from "@common-module/app";
import { Renderer } from "pixi.js";
import GameNode from "../GameNode.js";
import Camera from "./Camera.js";
export default class Screen extends DomNode {
    protected width: number;
    protected height: number;
    root: GameNode<import("pixi.js").Container<import("pixi.js").ContainerChild>>;
    camera: Camera;
    protected renderer: Renderer | undefined;
    private animationInterval;
    private beforeTime;
    protected ratio: number;
    constructor(width: number, height: number, ...nodes: GameNode[]);
    protected resize(width: number, height: number, ratio: number): void;
    private createRenderer;
    private step;
    private tic;
    resume(): void;
}
//# sourceMappingURL=Screen.d.ts.map