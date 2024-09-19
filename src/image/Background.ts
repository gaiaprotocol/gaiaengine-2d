import { TilingSprite } from "pixi.js";
import TextureLoader from "../loaders/TextureLoader.js";
import BaseSprite from "./BaseSprite.js";

export default class Background extends BaseSprite {
  private tilingSprite: TilingSprite | undefined;

  constructor(src: string, private options?: { scrollSpeedX: number }) {
    super(0, 0, src);
  }

  protected async loadTexture(src: string) {
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

  protected releaseTexture(src: string): void {
    TextureLoader.release(src);
  }

  protected update(deltaTime: number): void {
    if (this.tilingSprite && this.options?.scrollSpeedX) {
      this.tilingSprite.tilePosition.x += this.options.scrollSpeedX * deltaTime;
    }
    super.update(deltaTime);
  }
}
