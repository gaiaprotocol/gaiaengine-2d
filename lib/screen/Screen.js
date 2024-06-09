import { DomNode } from "@common-module/app";
import { autoDetectRenderer } from "pixi.js";
import GameNode from "../GameNode.js";
import Camera from "./Camera.js";
export default class Screen extends DomNode {
    root = new GameNode();
    camera = new Camera(this.root);
    renderer;
    animationInterval;
    beforeTime = 0;
    constructor(...nodes) {
        super();
        this.root.screen = this;
        this.root.append(...nodes);
        this.createRenderer();
        this.resume();
    }
    async createRenderer() {
        this.renderer = await autoDetectRenderer({});
        this.domElement.appendChild(this.renderer.canvas);
    }
    step(deltaTime) {
        this.root.step(deltaTime);
        this.renderer?.render(this.root.container);
    }
    tic = (now) => {
        const deltaTime = now - this.beforeTime;
        if (deltaTime > 0) {
            this.step(deltaTime);
            this.beforeTime = now;
        }
        this.animationInterval = requestAnimationFrame(this.tic);
    };
    resume() {
        if (!this.animationInterval) {
            this.beforeTime = performance.now();
            this.animationInterval = requestAnimationFrame(this.tic);
        }
    }
}
//# sourceMappingURL=Screen.js.map