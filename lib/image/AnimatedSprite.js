import { AnimatedSprite as PixiAnimatedSprite } from "pixi.js";
import Node from "../base/Node.js";
import SpritesheetLoader from "../texture/SpritesheetLoader.js";
export default class AnimatedSprite extends Node {
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
        if (!sheet || this.deleted)
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
    delete() {
        if (this._src)
            SpritesheetLoader.release(this._src);
        super.delete();
    }
}
//# sourceMappingURL=AnimatedSprite.js.map