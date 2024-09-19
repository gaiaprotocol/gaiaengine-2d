import { Sprite as PixiSprite } from "pixi.js";
import TextureLoader from "../loaders/TextureLoader.js";
import BaseSprite from "./BaseSprite.js";

export default class Sprite extends BaseSprite {
  constructor(x: number, y: number, src: string) {
    super(x, y);
    this.src = src;
  }

  protected async loadTexture(src: string) {
    const texture = await TextureLoader.load(src);
    if (!texture || this.removed) return;

    this.container.addChild(
      new PixiSprite({ texture, anchor: { x: 0.5, y: 0.5 } }),
    );
  }

  protected releaseTexture(src: string): void {
    TextureLoader.release(src);
  }
}
