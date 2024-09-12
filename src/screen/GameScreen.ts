import { DomNode } from "@common-module/app";
import { autoDetectRenderer, Renderer } from "pixi.js";
import GameNode from "../core/GameNode.js";
import GameObject from "../core/GameObject.js";

export default class GameScreen extends DomNode {
  private renderer: Renderer | undefined;

  public root = new GameObject(0, 0);

  constructor(
    public width: number,
    public height: number,
    ...nodes: (GameNode | undefined)[]
  ) {
    super();
    this.style({ position: "relative" });
    this.root.append(...nodes);
    this.createRenderer();
  }

  private async createRenderer() {
    this.renderer = await autoDetectRenderer({
      width: this.width,
      height: this.height,
    });
    this.element.appendChild(this.renderer.canvas);

    //TODO:
    this.renderer.render((this.root as any).container);
  }
}
