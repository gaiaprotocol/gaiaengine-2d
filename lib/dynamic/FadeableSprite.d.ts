import Sprite from "../image/Sprite.js";
export default class FadeableSprite extends Sprite {
    protected fadingSpeed: number;
    protected minFadingSpeed: number;
    protected maxFadingSpeed: number;
    protected fadingAccel: number;
    fadeIn(speed: number): void;
    fadeOut(speed: number): void;
    protected update(deltaTime: number): void;
}
//# sourceMappingURL=FadeableSprite.d.ts.map