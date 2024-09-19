import { AnimatedSprite as PixiAnimatedSprite } from "pixi.js";
import SpritesheetLoader from "../loaders/SpritesheetLoader.js";
import BaseSprite from "./BaseSprite.js";
export default class AnimatedSprite extends BaseSprite {
    atlas;
    animation;
    fps;
    animatedSprite;
    constructor(x, y, src, atlas, animation, fps) {
        super(x, y);
        this.atlas = atlas;
        this.animation = animation;
        this.fps = fps;
        this.src = src;
    }
    async loadTexture(src) {
        const sheet = await SpritesheetLoader.load(src, this.atlas);
        if (!sheet || this.removed)
            return;
        this.container.addChild(this.animatedSprite = new PixiAnimatedSprite(sheet.animations[this.animation]));
        this.animatedSprite.anchor.set(0.5, 0.5);
        this.animatedSprite.animationSpeed = this.fps / 60;
        this.animatedSprite.play();
    }
    releaseTexture(src) {
        SpritesheetLoader.release(src);
    }
}
//# sourceMappingURL=AnimatedSprite.js.map