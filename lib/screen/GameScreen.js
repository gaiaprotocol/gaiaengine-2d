import { DomNode } from "@common-module/app";
import { autoDetectRenderer } from "pixi.js";
import Camera from "./Camera.js";
import RootNode from "./RootNode.js";
export default class GameScreen extends DomNode {
    renderer;
    animationInterval;
    targetFPS;
    actualFPS;
    root = new RootNode();
    camera = new Camera(this);
    width;
    height;
    ratio = 1;
    backgroundColor;
    constructor(options, ...gameNodes) {
        super(".game-screen");
        this.width = options.width;
        this.height = options.height;
        this.backgroundColor = options.backgroundColor ?? 0x000000;
        this.root.setScreen(this).append(...gameNodes);
        this.createRenderer();
        this.onWindow("blur", () => this.actualFPS = 6);
        this.onWindow("focus", () => this.actualFPS = this.targetFPS);
    }
    resize(width, height, ratio = 1) {
        this.width = width;
        this.height = height;
        this.ratio = ratio;
        if (this.renderer) {
            this.renderer.resize(this.width, this.height);
            this.renderer.canvas.width = this.width;
            this.renderer.canvas.height = this.height;
            const style = {
                width: `${this.width * this.ratio}px`,
                height: `${this.height * this.ratio}px`,
            };
            Object.assign(this.renderer.canvas.style, style);
            this.style(style);
        }
        this.updateRootNodePosition();
    }
    async createRenderer() {
        this.renderer = await autoDetectRenderer({
            width: this.width,
            height: this.height,
            backgroundColor: this.backgroundColor,
        });
        this.renderer.canvas.style.display = "block";
        this.renderer.canvas.style.touchAction = "auto";
        this.root.setPosition(this.width / 2 - this.camera.getX() * this.camera.scale, this.height / 2 - this.camera.getY() * this.camera.scale);
        this.resize(this.width, this.height, this.ratio);
        this.htmlElement.appendChild(this.renderer.canvas);
        this.animationInterval = requestAnimationFrame(this.animate);
        this.updateRootNodePosition();
    }
    updateRootNodePosition() {
        this.root.scale = this.camera.scale;
        this.root.setPosition(this.width / 2 - this.camera.getX() * this.camera.scale, this.height / 2 - this.camera.getY() * this.camera.scale);
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