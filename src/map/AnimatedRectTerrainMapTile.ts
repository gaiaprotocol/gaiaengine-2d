import { SpritesheetData } from "pixi.js";
import AnimatedSprite from "../image/AnimatedSprite.js";

export default class AnimatedRectTerrainMapTile extends AnimatedSprite {
  private fadingSpeed = 0;

  constructor(
    x: number,
    y: number,
    src: string,
    atlas: SpritesheetData,
    animation: string,
    fps: number,
    fadeDuration?: number,
  ) {
    super(x, y, src, atlas, animation, fps);

    if (fadeDuration && fadeDuration > 0) {
      this.alpha = 0;
      this.fadingSpeed = 1 / fadeDuration;
    }
  }

  protected update(deltaTime: number): void {
    if (this.fadingSpeed > 0) {
      this.alpha += this.fadingSpeed * deltaTime;
      if (this.alpha > 1) {
        this.alpha = 1;
        this.fadingSpeed = 0;
      }
    }
    super.update(deltaTime);
  }
}
