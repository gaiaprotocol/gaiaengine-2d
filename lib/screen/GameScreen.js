import { DomNode } from "@common-module/app";
import { autoDetectRenderer } from "pixi.js";
import GameObject from "../core/GameObject.js";
export default class GameScreen extends DomNode {
    width;
    height;
    renderer;
    animationInterval;
    root = new GameObject(0, 0);
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
        this.style({ position: "relative" });
        this.createRenderer();
    }
    async createRenderer() {
        this.renderer = await autoDetectRenderer({
            width: this.width,
            height: this.height,
        });
        this.element.appendChild(this.renderer.canvas);
        this.animationInterval = requestAnimationFrame(this.animate);
    }
    animate = () => {
        this.renderer?.render(this.root.container);
        this.animationInterval = requestAnimationFrame(this.animate);
    };
}
//# sourceMappingURL=GameScreen.js.map