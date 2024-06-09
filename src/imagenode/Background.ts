import { Assets, TilingSprite } from "pixi.js";
import GameNode from "../GameNode.js";

interface BackgroundOptions {
  scrollSpeedX?: number;
}

export default class Background extends GameNode<TilingSprite> {
  constructor(src: string, private options?: BackgroundOptions) {
    super(new TilingSprite());
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

  public step(deltaTime: number) {
    if (this.options?.scrollSpeedX) {
      this.container.tilePosition.x += this.options.scrollSpeedX * deltaTime;
    }
    super.step(deltaTime);
  }
}
