import { DomNode } from "@common-module/app";
import { autoDetectRenderer, Renderer } from "pixi.js";
import Camera from "./Camera.js";
import RootNode from "./RootNode.js";

export default class GameScreen extends DomNode {
  private renderer: Renderer | undefined;
  private animationInterval: number | undefined;

  public root = new RootNode();
  public camera = new Camera();

  public ratio = 1;

  constructor(public width: number, public height: number) {
    super();
    this.root.setScreen(this);
    this.createRenderer();
  }

  private async createRenderer() {
    this.renderer = await autoDetectRenderer({
      width: this.width,
      height: this.height,
    });
    this.renderer.canvas.style.display = "block";

    this.root.setPosition(
      this.width / 2 - this.camera.x * this.camera.scale,
      this.height / 2 - this.camera.y * this.camera.scale,
    );

    this.element.appendChild(this.renderer.canvas);
    this.animationInterval = requestAnimationFrame(this.animate);
  }

  private update(deltaTime: number) {
    this.root.update(deltaTime);
    this.renderer?.render(this.root.getContainer());
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
