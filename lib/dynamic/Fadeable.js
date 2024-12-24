import GameObject from "../core/GameObject.js";
export default class Fadeable extends GameObject {
    fadingSpeed = 0;
    minFadingSpeed = -Infinity;
    maxFadingSpeed = Infinity;
    fadingAccel = 0;
    fadeInCallback;
    fadeOutCallback;
    fadeIn(duration, callback) {
        this.alpha = 0;
        this.fadingSpeed = 1 / duration;
        this.fadeInCallback = callback;
    }
    fadeOut(duration, callback) {
        this.alpha = 1;
        this.fadingSpeed = -1 / duration;
        this.fadeOutCallback = callback;
    }
    update(deltaTime) {
        this.fadingSpeed += this.fadingAccel * deltaTime;
        if (this.fadingSpeed < this.minFadingSpeed) {
            this.fadingSpeed = this.minFadingSpeed;
        }
        if (this.fadingSpeed > this.maxFadingSpeed) {
            this.fadingSpeed = this.maxFadingSpeed;
        }
        if (this.fadingSpeed !== 0) {
            this.alpha += this.fadingSpeed * deltaTime;
            if (this.alpha < 0) {
                this.alpha = 0;
                this.fadingSpeed = 0;
                this.fadeOutCallback?.();
            }
            if (this.alpha > 1) {
                this.alpha = 1;
                this.fadingSpeed = 0;
                this.fadeInCallback?.();
            }
        }
        super.update(deltaTime);
    }
}
//# sourceMappingURL=Fadeable.js.map