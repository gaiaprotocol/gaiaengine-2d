import { TilingSprite } from "pixi.js";
import GameObject from "../core/GameObject.js";
import TextureLoader from "../loaders/TextureLoader.js";

export default class Background extends GameObject {
  private _src: string | undefined;
  private tilingSprite: TilingSprite | undefined;

  constructor(src: string, private options?: { scrollSpeedX: number }) {
    super(0, 0);
    this.src = src;
  }

  private async load(src: string) {
    const texture = await TextureLoader.load(src);
    if (!texture || this.removed) return;

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
    if (this._src === src) return;
    if (this._src) TextureLoader.release(this._src);
    this._src = src;
    this.load(src);
  }

  public get src() {
    return this._src ?? "";
  }

  protected update(deltaTime: number): void {
    if (this.tilingSprite && this.options?.scrollSpeedX) {
      this.tilingSprite.tilePosition.x += this.options.scrollSpeedX * deltaTime;
    }
    super.update(deltaTime);
  }

  public remove(): void {
    if (this._src) TextureLoader.release(this._src);
    super.remove();
  }
}
