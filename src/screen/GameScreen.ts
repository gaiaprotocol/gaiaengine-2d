import { DomNode } from "@common-module/app";
import { autoDetectRenderer, Renderer } from "pixi.js";
import GameNode from "../core/GameNode.js";
import Camera from "./Camera.js";
import RootNode from "./RootNode.js";

export default class GameScreen extends DomNode {
  private renderer: Renderer | undefined;
  private animationInterval: number | undefined;

  private targetFPS: number | undefined;
  private actualFPS: number | undefined;

  public root = new RootNode();
  public camera = new Camera();

  public ratio = 1;

  constructor(
    public width: number,
    public height: number,
    ...gameNodes: (GameNode | undefined)[]
  ) {
    super();
    this.root.setScreen(this).append(...gameNodes);
    this.createRenderer();

    this.onWindow("blur", () => this.actualFPS = 6);
    this.onWindow("focus", () => this.actualFPS = this.targetFPS);
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

    this.htmlElement.appendChild(this.renderer.canvas);
    this.animationInterval = requestAnimationFrame(this.animate);
  }

  private update(deltaTime: number) {
    this.root.update(deltaTime);
    this.renderer?.render(this.root.getContainer());
  }

  private lastFrameTime = 0;
  private accumulatedTime = 0;

  private animate = (currentTime: number) => {
    const elapsedTime = (currentTime - this.lastFrameTime) / 1000;

    if (elapsedTime > 0) {
      if (this.actualFPS !== undefined && this.actualFPS > 0) {
        this.accumulatedTime += elapsedTime;

        const frameDuration = 1 / this.actualFPS;
        if (this.accumulatedTime >= frameDuration) {
          this.update(frameDuration);
          this.accumulatedTime -= frameDuration;
        }
      } else {
        this.update(elapsedTime);
      }
      this.lastFrameTime = currentTime;
    }

    this.animationInterval = requestAnimationFrame(this.animate);
  };

  public remove(): void {
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
