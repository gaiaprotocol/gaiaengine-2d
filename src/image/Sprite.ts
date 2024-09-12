import { Sprite as PixiSprite } from "pixi.js";
import GameObject from "../core/GameObject.js";
import TextureLoader from "../loaders/TextureLoader.js";

export default class Sprite extends GameObject {
  private _src: string | undefined;

  constructor(x: number, y: number, src: string) {
    super(x, y);
    this.src = src;
  }

  private async load(src: string) {
    const texture = await TextureLoader.load(src);
    this.container.addChild(
      new PixiSprite({ texture, anchor: { x: 0.5, y: 0.5 } }),
    );
  }

  public set src(src: string) {
    if (this._src === src) return;
    this._src = src;
    this.load(src);
  }

  public get src() {
    return this._src ?? "";
  }
}
