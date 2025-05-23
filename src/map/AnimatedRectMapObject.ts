import Atlas from "../data/Atlas.js";
import AnimatedSprite from "../image/AnimatedSprite.js";

interface AnimatedRectMapObjectOptions {
  src: string;
  atlas: Atlas;
  animation: string;
  fps: number;
  fadeDuration?: number;
}

export default class AnimatedRectMapObject extends AnimatedSprite {
  private fadingSpeed = 0;

  constructor(x: number, y: number, options: AnimatedRectMapObjectOptions) {
    super(x, y, options);

    if (options.fadeDuration && options.fadeDuration > 0) {
      this.alpha = 0;
      this.fadingSpeed = 1 / options.fadeDuration;
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
