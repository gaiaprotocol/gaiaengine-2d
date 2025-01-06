import { AnimatedSprite as PixiAnimatedSprite } from "pixi.js";
import Atlas from "../data/Atlas.js";
import SpritesheetLoader from "../loaders/SpritesheetLoader.js";
import BaseSprite from "./BaseSprite.js";

export default class AnimatedSprite extends BaseSprite {
  private animatedSprite: PixiAnimatedSprite | undefined;

  constructor(
    x: number,
    y: number,
    src: string,
    private atlas: Atlas,
    private animation: string,
    private fps: number,
  ) {
    super(x, y);
    this.src = src;
  }

  protected async loadTexture(src: string) {
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

  protected releaseTexture(src: string): void {
    SpritesheetLoader.release(src);
  }
}
