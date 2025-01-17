import AnimatedSprite from "../image/AnimatedSprite.js";
export default class AnimatedRectMapObject extends AnimatedSprite {
    fadingSpeed = 0;
    constructor(x, y, options) {
        super(x, y, options);
        if (options.fadeDuration && options.fadeDuration > 0) {
            this.alpha = 0;
            this.fadingSpeed = 1 / options.fadeDuration;
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
//# sourceMappingURL=AnimatedRectMapObject.js.map