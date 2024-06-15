import { TilingSprite } from "pixi.js";
import Node from "../base/Node.js";
import TextureLoader from "../texture/TextureLoader.js";

interface BackgroundOptions {
  scrollSpeedX?: number;
}

export default class Background extends Node {
  private tilingSprite: TilingSprite | undefined;

  constructor(private _src: string, private options?: BackgroundOptions) {
    super(0, 0);
    this.src = _src;
  }

  private async load(src: string) {
    const texture = await TextureLoader.load(src);
    if (!texture || this.deleted) return;

    this.container.addChild(
      this.tilingSprite = new TilingSprite({
        texture,
        width: texture.width,
        height: texture.height,
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

  protected update(deltaTime: number) {
    if (this.tilingSprite && this.options?.scrollSpeedX) {
      this.tilingSprite.tilePosition.x += this.options.scrollSpeedX * deltaTime;
    }
    super.update(deltaTime);
  }

  public delete(): void {
    TextureLoader.release(this._src);
    super.delete();
  }
}
