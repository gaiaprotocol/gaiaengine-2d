import { BrowserInfo, DomNode } from "@common-module/app";
import { autoDetectRenderer, Renderer } from "pixi.js";
import GaiaEngineConfig from "../GaiaEngineConfig.js";
import Camera from "./Camera.js";
import RootNode from "./RootNode.js";

interface GameScreenOptions {
  width: number;
  height: number;
  backgroundColor?: number;
}

export default class GameScreen extends DomNode {
  private renderer: Renderer | undefined;
  private animationInterval: number | undefined;

  private targetFPS: number | undefined;
  private actualFPS: number | undefined;

  public root = new RootNode();
  public camera = new Camera(this);

  public width: number;
  public height: number;
  public ratio = 1;

  private backgroundColor: number;

  constructor(options: GameScreenOptions) {
    super(".game-screen");
    this.style({ position: "relative" });

    this.width = options.width;
    this.height = options.height;
    this.backgroundColor = options.backgroundColor ?? 0x000000;

    this.root.setScreen(this);
    this.createRenderer();

    if (GaiaEngineConfig.isDevMode || BrowserInfo.isMobileDevice()) {
      if (!BrowserInfo.hasPageFocus()) this.actualFPS = 6;
      this.onWindow("blur", () => this.actualFPS = 6);
      this.onWindow("focus", () => this.actualFPS = this.targetFPS);
    }
  }

  public resize(width: number, height: number, ratio = 1) {
    this.width = width;
    this.height = height;
    this.ratio = ratio;

    if (this.renderer) {
      this.renderer.resize(this.width, this.height);
      this.renderer.canvas.width = this.width;
      this.renderer.canvas.height = this.height;

      const style = {
        width: `${this.width * this.ratio}px`,
        height: `${this.height * this.ratio}px`,
      };

      Object.assign(this.renderer.canvas.style, style);
      this.style(style);
    }

    this.updateRootNodePosition();
  }

  private async createRenderer() {
    this.renderer = await autoDetectRenderer({
      width: this.width,
      height: this.height,
      backgroundColor: this.backgroundColor,
      eventMode: "none",
    });
    this.renderer.canvas.style.display = "block";
    this.renderer.canvas.style.touchAction = "auto";

    this.root.setPosition(
      this.width / 2 - this.camera.getX() * this.camera.scale,
      this.height / 2 - this.camera.getY() * this.camera.scale,
    );

    this.resize(this.width, this.height, this.ratio);
    this.htmlElement.appendChild(this.renderer.canvas);
    this.animationInterval = requestAnimationFrame(this.animate);

    this.updateRootNodePosition();
  }

  public updateRootNodePosition() {
    this.root.scale = this.camera.scale;
    this.root.setPosition(
      this.width / 2 - this.camera.getX() * this.camera.scale,
      this.height / 2 - this.camera.getY() * this.camera.scale,
    );
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
