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
    ratio = 1;
    _backgroundColor;
    constructor(width, height, ...nodes) {
        super();
        this.width = width;
        this.height = height;
        this.style({ position: "relative" });
        this.root.screen = this;
        this.root.append(...nodes);
        this.createRenderer();
        this.resume();
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
        }
        this.updateRootPosition();
    }
    updateRootPosition() {
        this.root.setPosition(this.width / 2 - this.camera.x, this.height / 2 - this.camera.y);
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
            this._tick(deltaTime);
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
}
//# sourceMappingURL=Screen.js.map