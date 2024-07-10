import { DomNode } from "@common-module/app";
import { autoDetectRenderer } from "pixi.js";
import Node from "../base/Node.js";
import Camera from "./Camera.js";
export default class Screen extends DomNode {
    width;
    height;
    root = new Node(0, 0);
    camera = new Camera(this);
    renderer;
    animationInterval;
    beforeTime = 0;
    timeElapsed = 0;
    _fps;
    actualFps;
    ratio = 1;
    _backgroundColor;
    constructor(width, height, ...nodes) {
        super();
        this.width = width;
        this.height = height;
        this.style({ position: "relative" });
        this.root.screen = this;
        this.root.append(...nodes.filter((node) => node instanceof Node));
        this.createRenderer();
        this.resume();
        for (const node of nodes) {
            if (node && !(node instanceof Node)) {
                if (node.fps)
                    this.fps = node.fps;
            }
        }
        this.onWindow("blur", () => this.actualFps = 6);
        this.onWindow("focus", () => this.actualFps = this._fps);
    }
    set fps(fps) {
        this._fps = fps;
        this.actualFps = fps;
    }
    get fps() {
        return this._fps;
    }
    resize(width, height, ratio = 1) {
        this.width = width;
        this.height = height;
        this.ratio = ratio;
        if (this.renderer) {
            this.renderer.resize(this.width, this.height);
            this.renderer.canvas.width = this.width;
            this.renderer.canvas.height = this.height;
            this.renderer.canvas.style.width = `${this.width * this.ratio}px`;
            this.renderer.canvas.style.height = `${this.height * this.ratio}px`;
            this.style({
                width: this.width * this.ratio,
                height: this.height * this.ratio,
            });
        }
        this.updateRootPosition();
    }
    updateRootPosition() {
        this.root.scale = this.camera.scale;
        this.root.setPosition(this.width / 2 - this.camera.x * this.camera.scale, this.height / 2 - this.camera.y * this.camera.scale);
    }
    async createRenderer() {
        this.renderer = await autoDetectRenderer({
            width: this.width,
            height: this.height,
        });
        if (this._backgroundColor) {
            this.renderer.background.color = this._backgroundColor;
        }
        this.resize(this.width, this.height, this.ratio);
        this.domElement.appendChild(this.renderer.canvas);
    }
    _tick(deltaTime) {
        this.root._tick(deltaTime);
        this.renderer?.render(this.root.container);
    }
    _animate = (now) => {
        const deltaTime = (now - this.beforeTime) / 1000;
        if (deltaTime > 0) {
            if (this.actualFps !== undefined && this.actualFps > 0) {
                this.timeElapsed += deltaTime;
                const frameSecond = 1 / this.actualFps;
                if (this.timeElapsed >= frameSecond) {
                    this._tick(frameSecond);
                    this.timeElapsed -= frameSecond;
                }
            }
            else {
                this._tick(deltaTime);
            }
            this.beforeTime = now;
        }
        this.animationInterval = requestAnimationFrame(this._animate);
    };
    resume() {
        if (!this.animationInterval) {
            this.beforeTime = performance.now();
            this.animationInterval = requestAnimationFrame(this._animate);
        }
    }
    set backgroundColor(color) {
        this._backgroundColor = color;
        if (this.renderer)
            this.renderer.background.color = color;
    }
    get backgroundColor() {
        return this._backgroundColor ?? 0x000000;
    }
    delete() {
        if (this.renderer) {
            this.renderer.destroy();
            this.renderer = undefined;
        }
        if (this.animationInterval) {
            cancelAnimationFrame(this.animationInterval);
            this.animationInterval = undefined;
        }
        super.delete();
    }
}
//# sourceMappingURL=Screen.js.map