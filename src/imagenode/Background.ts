import { Assets, TilingSprite } from "pixi.js";
import Movable, { MovableOptions } from "../object/Movable.js";

export default class Background extends Movable<TilingSprite> {
  constructor(src: string, options?: MovableOptions) {
    super(new TilingSprite(), options);
    this.src = src;
  }

  private async load(src: string) {
    const texture = await Assets.load(src);
    (this.container as any)._width = texture.width;
    (this.container as any)._height = texture.height;
    this.container.texture = texture;
  }

  public set src(src: string) {
    this.load(src);
  }
}
