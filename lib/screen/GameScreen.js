import { DomNode } from "@common-module/app";
import { autoDetectRenderer } from "pixi.js";
import GameObject from "../core/GameObject.js";
import Camera from "./Camera.js";
export default class GameScreen extends DomNode {
    width;
    height;
    renderer;
    animationInterval;
    root = new GameObject(0, 0);
    camera = new Camera();
    ratio = 1;
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
        this.style({ position: "relative" });
        this.root.screen = this;
        this.createRenderer();
    }
    async createRenderer() {
        this.renderer = await autoDetectRenderer({
            width: this.width,
            height: this.height,
        });
        this.root.setPosition(this.width / 2 - this.camera.x * this.camera.scale, this.height / 2 - this.camera.y * this.camera.scale);
        this.element.appendChild(this.renderer.canvas);
        this.animationInterval = requestAnimationFrame(this.animate);
    }
    update(deltaTime) {
        this.root.update(deltaTime);
        this.renderer?.render(this.root.container);
    }
    previousTime = 0;
    animate = (timestamp) => {
        const deltaTime = (timestamp - this.previousTime) / 1000;
        if (deltaTime > 0) {
            this.update(deltaTime);
            this.previousTime = timestamp;
        }
        this.animationInterval = requestAnimationFrame(this.animate);
    };
}
//# sourceMappingURL=GameScreen.js.map