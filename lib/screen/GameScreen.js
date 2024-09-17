import { DomNode } from "@common-module/app";
import { autoDetectRenderer } from "pixi.js";
import Camera from "./Camera.js";
import RootNode from "./RootNode.js";
export default class GameScreen extends DomNode {
    width;
    height;
    renderer;
    animationInterval;
    targetFPS;
    actualFPS;
    root = new RootNode();
    camera = new Camera();
    ratio = 1;
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
        this.root.setScreen(this);
        this.createRenderer();
    }
    async createRenderer() {
        this.renderer = await autoDetectRenderer({
            width: this.width,
            height: this.height,
        });
        this.renderer.canvas.style.display = "block";
        this.root.setPosition(this.width / 2 - this.camera.x * this.camera.scale, this.height / 2 - this.camera.y * this.camera.scale);
        this.element.appendChild(this.renderer.canvas);
        this.animationInterval = requestAnimationFrame(this.animate);
    }
    update(deltaTime) {
        this.root.update(deltaTime);
        this.renderer?.render(this.root.getContainer());
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