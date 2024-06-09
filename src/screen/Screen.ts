import { DomNode } from "@common-module/app";
import { autoDetectRenderer, Renderer } from "pixi.js";
import GameNode from "../GameNode.js";
import Camera from "./Camera.js";

export default class Screen extends DomNode {
  public root = new GameNode();
  public camera = new Camera(this.root);

  private renderer: Renderer | undefined;
  private animationInterval: number | undefined;
  private beforeTime = 0;

  constructor(...nodes: GameNode[]) {
    super();
    this.root.screen = this;
    this.root.append(...nodes);
    this.createRenderer();
    this.resume();
  }

  private async createRenderer() {
    this.renderer = await autoDetectRenderer({});
    this.domElement.appendChild(this.renderer.canvas);
  }

  private step(deltaTime: number) {
    this.root.step(deltaTime);
    this.renderer?.render(this.root.container);
  }

  private tic = (now: number) => {
    const deltaTime = now - this.beforeTime;
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
