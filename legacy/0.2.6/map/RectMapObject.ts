import Atlas from "../data/Atlas.js";
import Sprite from "../image/Sprite.js";

export default class RectMapObject extends Sprite {
  private fadingSpeed = 0;

  constructor(
    x: number,
    y: number,
    src: string,
    atlas?: Atlas,
    frame?: string,
    fadeDuration?: number,
  ) {
    super(x, y, src, atlas, frame);

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
