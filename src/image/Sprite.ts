import { Sprite as PixiSprite } from "pixi.js";
import Atlas from "../data/Atlas.js";
import SpritesheetLoader from "../loaders/SpritesheetLoader.js";
import TextureLoader from "../loaders/TextureLoader.js";
import AtlasHasher from "./AtlasHasher.js";
import BaseImageSprite from "./BaseImageSprite.js";

export default class Sprite extends BaseImageSprite {
  private id?: string;

  constructor(
    x: number,
    y: number,
    src: string,
    private atlas?: Atlas,
    private frame?: string,
  ) {
    super(x, y);
    this.src = src;
  }

  protected async loadTexture(src: string) {
    if (this.atlas) {
      if (!this.frame) throw new Error("Frame not found");

      this.id = `${src}:${AtlasHasher.getAtlasHash(this.atlas)}`;

      const sheet = await SpritesheetLoader.load(this.id, src, this.atlas);
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
    this.atlas
      ? SpritesheetLoader.release(this.id!)
      : TextureLoader.release(src);
  }
}
