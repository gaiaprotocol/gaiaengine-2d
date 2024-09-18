import { AnimatedSprite as PixiAnimatedSprite, SpritesheetData } from "pixi.js";
import GameObject from "../core/GameObject.js";
import SpritesheetLoader from "../loaders/SpritesheetLoader.js";

export default class AnimatedSprite extends GameObject {
  private _src: string | undefined;
  private animatedSprite: PixiAnimatedSprite | undefined;

  constructor(
    x: number,
    y: number,
    src: string,
    private atlas: SpritesheetData,
    private animation: string,
    private fps: number,
  ) {
    super(x, y);
    this.src = src;
  }

  private async load(src: string) {
    const sheet = await SpritesheetLoader.load(src, this.atlas);
    if (!sheet || this.removed) return;

    this.container.addChild(
      this.animatedSprite = new PixiAnimatedSprite(
        sheet.animations[this.animation],
      ),
    );

    this.animatedSprite.anchor.set(0.5, 0.5);
    this.animatedSprite.animationSpeed = this.fps / 60;
    this.animatedSprite.play();
  }

  public set src(src: string) {
    if (this._src === src) return;
    if (this._src) SpritesheetLoader.release(this._src);
    this._src = src;
    this.load(src);
  }

  public get src() {
    return this._src ?? "";
  }

  public remove(): void {
    if (this._src) SpritesheetLoader.release(this._src);
    super.remove();
  }
}
