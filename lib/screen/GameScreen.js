import { DomNode } from "@common-module/app";
import { autoDetectRenderer } from "pixi.js";
import GameObject from "../core/GameObject.js";
export default class GameScreen extends DomNode {
    width;
    height;
    renderer;
    root = new GameObject(0, 0);
    constructor(width, height, ...nodes) {
        super();
        this.width = width;
        this.height = height;
        this.style({ position: "relative" });
        this.root.append(...nodes);
        this.createRenderer();
    }
    async createRenderer() {
        this.renderer = await autoDetectRenderer({
            width: this.width,
            height: this.height,
        });
        this.element.appendChild(this.renderer.canvas);
        this.renderer.render(this.root.container);
    }
}
//# sourceMappingURL=GameScreen.js.map