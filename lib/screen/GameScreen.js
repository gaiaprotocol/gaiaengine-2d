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
    constructor(width, height, ...gameNodes) {
        super();
        this.width = width;
        this.height = height;
        this.root.setScreen(this).append(...gameNodes);
        this.createRenderer();
        this.onWindow("blur", () => this.actualFPS = 6);
        this.onWindow("focus", () => this.actualFPS = this.targetFPS);
    }
    async createRenderer() {
        this.renderer = await autoDetectRenderer({
            width: this.width,
            height: this.height,
        });
        this.renderer.canvas.style.display = "block";
        this.root.setPosition(this.width / 2 - this.camera.x * this.camera.scale, this.height / 2 - this.camera.y * this.camera.scale);
        this.htmlElement.appendChild(this.renderer.canvas);
        this.animationInterval = requestAnimationFrame(this.animate);
    }
    update(deltaTime) {
        this.root.update(deltaTime);
        this.renderer?.render(this.root.getContainer());
    }
    lastFrameTime = 0;
    accumulatedTime = 0;
    animate = (currentTime) => {
        const elapsedTime = (currentTime - this.lastFrameTime) / 1000;
        if (elapsedTime > 0) {
            if (this.actualFPS !== undefined && this.actualFPS > 0) {
                this.accumulatedTime += elapsedTime;
                const frameDuration = 1 / this.actualFPS;
                if (this.accumulatedTime >= frameDuration) {
                    this.update(frameDuration);
                    this.accumulatedTime -= frameDuration;
                }
            }
            else {
                this.update(elapsedTime);
            }
            this.lastFrameTime = currentTime;
        }
        this.animationInterval = requestAnimationFrame(this.animate);
    };
    remove() {
        if (this.renderer) {
            this.renderer.destroy();
            this.renderer = undefined;
        }
        if (this.animationInterval) {
            cancelAnimationFrame(this.animationInterval);
            this.animationInterval = undefined;
        }
        super.remove();
    }
}
//# sourceMappingURL=GameScreen.js.map