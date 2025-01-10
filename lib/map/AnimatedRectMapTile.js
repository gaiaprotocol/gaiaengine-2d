import AnimatedSprite from "../image/AnimatedSprite.js";
export default class AnimatedRectMapTerrain extends AnimatedSprite {
    fadingSpeed = 0;
    constructor(x, y, src, atlas, animation, fps, fadeDuration) {
        super(x, y, src, atlas, animation, fps);
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
//# sourceMappingURL=AnimatedRectMapTile.js.map