import { Sprite as PixiSprite, SpritesheetData } from "pixi.js";
import Node from "../base/Node.js";
import SpritesheetLoader from "../texture/SpritesheetLoader.js";
import TextureLoader from "../texture/TextureLoader.js";

export default class Sprite extends Node {
  private _src: string | undefined;

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

  private async load(src: string) {
    if (this.atlas) {
      if (!this.frame) throw new Error("Frame not found");

      const sheet = await SpritesheetLoader.load(src, this.atlas);
      if (!sheet || this.deleted) return;

      const texture = sheet.textures[this.frame];
      if (!texture) throw new Error(`Failed to load texture: ${src}`);

      this.container.addChild(
        new PixiSprite({ texture, anchor: { x: 0.5, y: 0.5 } }),
      );
    } else {
      const texture = await TextureLoader.load(src);
      if (!texture || this.deleted) return;

      this.container.addChild(
        new PixiSprite({ texture, anchor: { x: 0.5, y: 0.5 } }),
      );
    }

    //if (this.onLoaded) this.onLoaded();
  }

  public set src(src: string) {
    if (this._src === src) return;
    if (this._src) {
      this.atlas
        ? SpritesheetLoader.release(this._src)
        : TextureLoader.release(this._src);
    }
    this._src = src;
    this.load(src);
  }

  public get src() {
    return this._src ?? "";
  }

  public get width() {
    return this.container.width;
  }

  public get height() {
    return this.container.height;
  }

  public delete(): void {
    if (this._src) {
      this.atlas
        ? SpritesheetLoader.release(this._src)
        : TextureLoader.release(this._src);
    }
    super.delete();
  }
}
