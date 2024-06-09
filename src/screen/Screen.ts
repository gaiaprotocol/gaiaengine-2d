import { DomNode } from "@common-module/app";
import { autoDetectRenderer, Renderer } from "pixi.js";
import GameNode from "../GameNode.js";
import Camera from "./Camera.js";

export default class Screen extends DomNode {
  public root = new GameNode();
  public camera = new Camera(this.root);

  protected renderer: Renderer | undefined;

  private animationInterval: number | undefined;
  private beforeTime = 0;

  public ratio = 1;

  constructor(
    public width: number,
    public height: number,
    ...nodes: GameNode[]
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
  }

  private async createRenderer() {
    this.renderer = await autoDetectRenderer({
      width: this.width,
      height: this.height,
    });
    this.renderer.canvas.width = this.width;
    this.renderer.canvas.height = this.height;
    this.renderer.canvas.style.width = `${this.width * this.ratio}px`;
    this.renderer.canvas.style.height = `${this.height * this.ratio}px`;
    this.domElement.appendChild(this.renderer.canvas);
  }

  private step(deltaTime: number) {
    this.root.step(deltaTime);
    this.renderer?.render(this.root.container);
  }

  private tic = (now: number) => {
    const deltaTime = (now - this.beforeTime) / 1000;
    if (deltaTime > 0) {
      this.step(deltaTime);
      this.beforeTime = now;
    }
    this.animationInterval = requestAnimationFrame(this.tic);
  };

  public resume(): void {
    if (!this.animationInterval) {
      this.beforeTime = performance.now();
      this.animationInterval = requestAnimationFrame(this.tic);
    }
  }
}
