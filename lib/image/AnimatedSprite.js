import { AnimatedSprite as PixiAnimatedSprite } from "pixi.js";
import GameObject from "../core/GameObject.js";
import SpritesheetLoader from "../loaders/SpritesheetLoader.js";
export default class AnimatedSprite extends GameObject {
    atlas;
    animation;
    fps;
    _src;
    animatedSprite;
    constructor(x, y, src, atlas, animation, fps) {
        super(x, y);
        this.atlas = atlas;
        this.animation = animation;
        this.fps = fps;
        this.src = src;
    }
    async load(src) {
        const sheet = await SpritesheetLoader.load(src, this.atlas);
        if (!sheet || this.removed)
            return;
        this.container.addChild(this.animatedSprite = new PixiAnimatedSprite(sheet.animations[this.animation]));
        this.animatedSprite.anchor.set(0.5, 0.5);
        this.animatedSprite.animationSpeed = this.fps / 60;
        this.animatedSprite.play();
    }
    set src(src) {
        if (this._src === src)
            return;
        if (this._src)
            SpritesheetLoader.release(this._src);
        this._src = src;
        this.load(src);
    }
    get src() {
        return this._src ?? "";
    }
    remove() {
        if (this._src)
            SpritesheetLoader.release(this._src);
        super.remove();
    }
}
//# sourceMappingURL=AnimatedSprite.js.map