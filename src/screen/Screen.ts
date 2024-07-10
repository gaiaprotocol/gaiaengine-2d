import { DomNode } from "@common-module/app";
import { autoDetectRenderer, Renderer } from "pixi.js";
import Node from "../base/Node.js";
import Camera from "./Camera.js";

export interface ScreenOptions {
  fps?: number;
}

export default class Screen extends DomNode {
  public root = new Node(0, 0);
  public camera = new Camera(this);

  protected renderer: Renderer | undefined;

  private animationInterval: number | undefined;
  private beforeTime = 0;
  private timeElapsed = 0;

  private _fps: number | undefined;
  private actualFps: number | undefined;

  public ratio = 1;
  private _backgroundColor: number | undefined;

  constructor(
    public width: number,
    public height: number,
    ...nodes: (Node | ScreenOptions | undefined)[]
  ) {
    super();
    this.style({ position: "relative" });
    this.root.screen = this;
    this.root.append(
      ...nodes.filter((node): node is Node => node instanceof Node),
    );
    this.createRenderer();
    this.resume();

    for (const node of nodes) {
      if (node && !(node instanceof Node)) {
        if (node.fps) this.fps = node.fps;
      }
    }

    this.onWindow("blur", () => this.actualFps = 6);
    this.onWindow("focus", () => this.actualFps = this._fps);
  }

  public set fps(fps: number | undefined) {
    this._fps = fps;
    this.actualFps = fps;
  }

  public get fps() {
    return this._fps;
  }

  public resize(width: number, height: number, ratio = 1) {
    this.width = width;
    this.height = height;
    this.ratio = ratio;

    if (this.renderer) {
      this.renderer.resize(this.width, this.height);
      this.renderer.canvas.width = this.width;
      this.renderer.canvas.height = this.height;
      this.renderer.canvas.style.width = `${this.width * this.ratio}px`;
      this.renderer.canvas.style.height = `${this.height * this.ratio}px`;
      this.style({
        width: this.width * this.ratio,
        height: this.height * this.ratio,
      });
    }

    this.updateRootPosition();
  }

  public updateRootPosition() {
    this.root.scale = this.camera.scale;
    this.root.setPosition(
      this.width / 2 - this.camera.x * this.camera.scale,
      this.height / 2 - this.camera.y * this.camera.scale,
    );
  }

  private async createRenderer() {
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

  private _tick(deltaTime: number) {
    (this.root as any)._tick(deltaTime);
    this.renderer?.render(this.root.container);
  }

  private _animate = (now: number) => {
    const deltaTime = (now - this.beforeTime) / 1000;
    if (deltaTime > 0) {
      if (this.actualFps !== undefined && this.actualFps > 0) {
        this.timeElapsed += deltaTime;
        const frameSecond = 1 / this.actualFps;
        if (this.timeElapsed >= frameSecond) {
          this._tick(frameSecond);
          this.timeElapsed -= frameSecond;
        }
      } else {
        this._tick(deltaTime);
      }
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

  public set backgroundColor(color: number) {
    this._backgroundColor = color;
    if (this.renderer) this.renderer.background.color = color;
  }

  public get backgroundColor() {
    return this._backgroundColor ?? 0x000000;
  }

  public delete(): void {
    if (this.renderer) {
      this.renderer.destroy();
      this.renderer = undefined;
    }
    if (this.animationInterval) {
      cancelAnimationFrame(this.animationInterval);
      this.animationInterval = undefined;
    }
    super.delete();
  }
}
