import { Sprite } from "pixi.js";
import Node from "../base/Node.js";
import TextureLoader from "../texture/TextureLoader.js";

export default class Image extends Node {
  constructor(x: number, y: number, private _src: string) {
    super(x, y);
    this.src = _src;
  }

  private async load(src: string) {
    const texture = await TextureLoader.load(src);
    if (!texture || this.deleted) return;

    this.container.addChild(
      new Sprite({
        texture,
        anchor: { x: 0.5, y: 0.5 },
      }),
    );
  }

  public set src(src: string) {
    this._src = src;
    this.load(src);
  }

  public get src() {
    return this._src;
  }

  public delete(): void {
    TextureLoader.release(this._src);
    super.delete();
  }
}
