import { DomNode } from "@common-module/app";
import GameNode from "../GameNode.js";
import Camera from "./Camera.js";
export default class Screen extends DomNode {
    root: GameNode<import("pixi.js").Container<import("pixi.js").ContainerChild>>;
    camera: Camera;
    private renderer;
    private animationInterval;
    private beforeTime;
    constructor(...nodes: GameNode[]);
    private createRenderer;
    private step;
    private tic;
    resume(): void;
}
//# sourceMappingURL=Screen.d.ts.map