import { AnimatedSprite as PixiAnimatedSprite, Sprite as PixiSprite, } from "pixi.js";
import GameObject from "../core/GameObject.js";
import SpritesheetLoader from "../loaders/SpritesheetLoader.js";
import AtlasHasher from "./AtlasHasher.js";
export default class AnimatedSprite extends GameObject {
    src;
    atlas;
    _animation;
    fps;
    id;
    sheet;
    currentSprite;
    constructor(x, y, src, atlas, _animation, fps) {
        super(x, y);
        this.src = src;
        this.atlas = atlas;
        this._animation = _animation;
        this.fps = fps;
        this.id = `${src}:${AtlasHasher.getAtlasHash(atlas)}`;
        this.load();
    }
    changeAnimation() {
        if (!this.sheet)
            return;
        this.currentSprite?.destroy();
        if (this.atlas.animations?.[this.animation].length === 1) {
            const frame = this.atlas.animations[this.animation][0];
            const texture = this.sheet.textures[frame];
            if (!texture)
                throw new Error(`Failed to load texture: ${this.src}`);
            const sprite = new PixiSprite({ texture, anchor: { x: 0.5, y: 0.5 } });
            this.container.addChild(sprite);
            this.currentSprite = sprite;
        }
        else {
            const sprite = new PixiAnimatedSprite(this.sheet.animations[this.animation]);
            sprite.anchor.set(0.5, 0.5);
            sprite.animationSpeed = this.fps / 60;
            sprite.play();
            this.container.addChild(sprite);
            this.currentSprite = sprite;
        }
    }
    async load() {
        this.sheet = await SpritesheetLoader.load(this.id, this.src, this.atlas);
        if (!this.sheet || this.removed)
            return;
        this.changeAnimation();
    }
    set animation(animation) {
        if (this._animation === animation)
            return;
        this._animation = animation;
        this.changeAnimation();
    }
    get animation() {
        return this._animation;
    }
    remove() {
        SpritesheetLoader.release(this.id);
        super.remove();
    }
}
//# sourceMappingURL=AnimatedSprite.js.map