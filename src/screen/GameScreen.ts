import { DomNode } from "@common-module/app";
import { autoDetectRenderer, Renderer } from "pixi.js";
import GameObject from "../core/GameObject.js";
import Camera from "./Camera.js";

export default class GameScreen extends DomNode {
  private renderer: Renderer | undefined;
  private animationInterval: number | undefined;

  public root = new GameObject(0, 0);
  public camera = new Camera();

  public ratio = 1;

  constructor(public width: number, public height: number) {
    super();
    this.style({ position: "relative" });
    (this.root as any).screen = this;
    this.createRenderer();
  }

  private async createRenderer() {
    this.renderer = await autoDetectRenderer({
      width: this.width,
      height: this.height,
    });
    this.element.appendChild(this.renderer.canvas);
    this.animationInterval = requestAnimationFrame(this.animate);
  }

  private update(deltaTime: number) {
    (this.root as any).update(deltaTime);
    this.renderer?.render((this.root as any).container);
  }

  private previousTime = 0;

  private animate = (timestamp: number) => {
    const deltaTime = (timestamp - this.previousTime) / 1000;

    if (deltaTime > 0) {
      this.update(deltaTime);
      this.previousTime = timestamp;
    }

    this.animationInterval = requestAnimationFrame(this.animate);
  };
}
