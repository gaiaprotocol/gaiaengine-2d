import { Sprite as PixiSprite, SpritesheetData } from "pixi.js";
import SpritesheetLoader from "../loaders/SpritesheetLoader.js";
import TextureLoader from "../loaders/TextureLoader.js";
import BaseSprite from "./BaseSprite.js";

export default class Sprite extends BaseSprite {
  constructor(
    x: number,
    y: number,
    src: string,
    private atlas?: SpritesheetData,
    private frame?: string,
  ) {
    super(x, y);
    this.src = src;
  }

  protected async loadTexture(src: string) {
    if (this.atlas) {
      if (!this.frame) throw new Error("Frame not found");

      const sheet = await SpritesheetLoader.load(src, this.atlas);
      if (!sheet || this.removed) return;

      const texture = sheet.textures[this.frame];
      if (!texture) throw new Error(`Failed to load texture: ${src}`);

      this.container.addChild(
        new PixiSprite({ texture, anchor: { x: 0.5, y: 0.5 } }),
      );
    } else {
      const texture = await TextureLoader.load(src);
      if (!texture || this.removed) return;

      this.container.addChild(
        new PixiSprite({ texture, anchor: { x: 0.5, y: 0.5 } }),
      );
    }
  }

  protected releaseTexture(src: string): void {
    this.atlas ? SpritesheetLoader.release(src) : TextureLoader.release(src);
  }
}
