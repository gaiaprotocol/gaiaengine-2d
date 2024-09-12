import { DomNode } from "@common-module/app";
import { autoDetectRenderer, Renderer } from "pixi.js";
import GameObject from "../core/GameObject.js";

export default class GameScreen extends DomNode {
  private renderer: Renderer | undefined;
  private animationInterval: number | undefined;

  public root = new GameObject(0, 0);

  constructor(public width: number, public height: number) {
    super();
    this.style({ position: "relative" });
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

  private animate = () => {
    this.renderer?.render((this.root as any).container);
    this.animationInterval = requestAnimationFrame(this.animate);
  };
}
