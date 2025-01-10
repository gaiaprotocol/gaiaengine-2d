import Sprite from "../image/Sprite.js";
export default class RectTerrainMapObject extends Sprite {
    fadingSpeed = 0;
    constructor(x, y, src, atlas, frame, fadeDuration) {
        super(x, y, src, atlas, frame);
        if (fadeDuration && fadeDuration > 0) {
            this.alpha = 0;
            this.fadingSpeed = 1 / fadeDuration;
        }
    }
    update(deltaTime) {
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
//# sourceMappingURL=RectTerrainMapObject.js.map