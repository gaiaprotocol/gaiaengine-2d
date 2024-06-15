import { DomNode } from "@common-module/app";
import { autoDetectRenderer, Renderer } from "pixi.js";
import Node from "../base/Node.js";
import Camera from "./Camera.js";

export default class Screen extends DomNode {
  public root = new Node(0, 0);
  public camera = new Camera(this.root);

  protected renderer: Renderer | undefined;

  private animationInterval: number | undefined;
  private beforeTime = 0;

  public ratio = 1;

  constructor(
    public width: number,
    public height: number,
    ...nodes: (Node | undefined)[]
  ) {
    super();
    this.root.screen = this;
    this.root.append(...nodes);
    this.createRenderer();
    this.resume();
  }

  protected resize(width: number, height: number, ratio: number) {
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

    this.root.setPosition(this.width / 2, this.height / 2);
  }

  private async createRenderer() {
    this.renderer = await autoDetectRenderer({
      width: this.width,
      height: this.height,
    });
    this.resize(this.width, this.height, this.ratio);
    this.domElement.appendChild(this.renderer.canvas);
  }

  private _tick(deltaTime: number) {
    (this.root as any)._tick(deltaTime);
    this.renderer?.render(this.root.container);
  }

  private _animate = (now: number) => {
    const deltaTime = (now - this.beforeTime) / 1000;
    if (deltaTime > 0) {
      this._tick(deltaTime);
      this.beforeTime = now;
    }
    this.animationInterval = requestAnimationFrame(this._animate);
  };

  public resume(): void {
    if (!this.animationInterval) {
      this.beforeTime = performance.now();
      this.animationInterval = requestAnimationFrame(this._animate);
    }
  }
}
