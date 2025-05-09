import { TilingSprite } from "pixi.js";
import TextureLoader from "../loaders/TextureLoader.js";
import BaseImageSprite from "./BaseImageSprite.js";

export default class Background extends BaseImageSprite {
  private tilingSprite?: TilingSprite;
  private _scrollSpeedX: number = 0;
  private _scrollSpeedY: number = 0;

  constructor(
    src: string,
    private options?: { scrollSpeedX?: number; scrollSpeedY?: number },
  ) {
    super(0, 0);
    this._scrollSpeedX = options?.scrollSpeedX ?? 0;
    this._scrollSpeedY = options?.scrollSpeedY ?? 0;
    this.src = src;
  }

  protected async loadTexture(src: string) {
    const texture = await TextureLoader.load(src);
    if (!texture || this.isRemoved()) return;

    this.container.addChild(
      this.tilingSprite = new TilingSprite({
        texture,
        width: texture.width,
        height: texture.height,
        anchor: { x: 0.5, y: 0.5 },
      }),
    );
  }

  protected releaseTexture(src: string): void {
    TextureLoader.release(src);
  }

  protected update(deltaTime: number): void {
    if (this.tilingSprite) {
      if (this._scrollSpeedX) {
        this.tilingSprite.tilePosition.x += this._scrollSpeedX * deltaTime;
      }
      if (this._scrollSpeedY) {
        this.tilingSprite.tilePosition.y += this._scrollSpeedY * deltaTime;
      }
    }
    super.update(deltaTime);
  }

  public set scrollSpeedX(value: number) {
    this._scrollSpeedX = value;
  }
  public get scrollSpeedX(): number {
    return this._scrollSpeedX;
  }
  public set scrollSpeedY(value: number) {
    this._scrollSpeedY = value;
  }
  public get scrollSpeedY(): number {
    return this._scrollSpeedY;
  }
}
