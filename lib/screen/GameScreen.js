import { BrowserInfo, DomNode } from "@common-module/app";
import { autoDetectRenderer } from "pixi.js";
import GameObject from "../core/GameObject.js";
import GaiaEngineConfig from "../GaiaEngineConfig.js";
import Camera from "./Camera.js";
import Layer from "./Layer.js";
import SuperRootNode from "./SuperRootNode.js";
export default class GameScreen extends DomNode {
    _options;
    renderer;
    animationInterval;
    targetFPS;
    actualFPS;
    superRoot = new SuperRootNode();
    layers = {};
    camera = new Camera(this);
    root = new GameObject(0, 0);
    width;
    height;
    ratio = 1;
    backgroundColor;
    constructor(_options) {
        super(".game-screen");
        this._options = _options;
        this.style({ position: "relative" });
        this.width = _options.width;
        this.height = _options.height;
        this.backgroundColor = _options.backgroundColor ?? 0x000000;
        this.superRoot.setScreen(this);
        for (const layerInfo of _options.layers ?? []) {
            const layer = new Layer();
            layer.drawingOrder = layerInfo.drawingOrder;
            this.layers[layerInfo.name] = layer;
            this.superRoot.append(layer);
        }
        this.root.appendTo(this.superRoot);
        this.createRenderer();
        if (GaiaEngineConfig.isDevMode || BrowserInfo.isMobileDevice()) {
            if (!BrowserInfo.hasPageFocus())
                this.actualFPS = 6;
            this.onWindow("blur", () => this.actualFPS = 6);
            this.onWindow("focus", () => this.actualFPS = this.targetFPS);
        }
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
            eventMode: "none",
        });
        this.renderer.canvas.style.display = "block";
        this.renderer.canvas.style.touchAction = "auto";
        if (this._options.pixelated) {
            this.renderer.canvas.style.imageRendering = "pixelated";
        }
        this.resize(this.width, this.height, this.ratio);
        this.htmlElement.appendChild(this.renderer.canvas);
        this.animationInterval = requestAnimationFrame(this.animate);
    }
    updateRootNodePosition() {
        this.root.scale = this.camera.scale;
        this.root.setPosition(this.width / 2 - this.camera.getX() * this.camera.scale, this.height / 2 - this.camera.getY() * this.camera.scale);
    }
    update(deltaTime) {
        this.superRoot.update(deltaTime);
        this.renderer?.render(this.superRoot.getContainer());
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
    appendToLayer(pixiContainer, layerName) {
        const layer = this.layers[layerName];
        if (!layer)
            throw new Error(`Layer ${layerName} does not exist.`);
        layer.getContainer().addChild(pixiContainer);
    }
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