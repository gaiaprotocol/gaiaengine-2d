import { AnimatedSprite as PixiAnimatedSprite, Sprite as PixiSprite, } from "pixi.js";
import GameObject from "../core/GameObject.js";
import SpritesheetLoader from "../loaders/SpritesheetLoader.js";
import AtlasHasher from "./AtlasHasher.js";
export default class AnimatedSprite extends GameObject {
    options;
    id;
    _animation;
    sheet;
    currentSprite;
    constructor(x, y, options) {
        super(x, y);
        this.options = options;
        this.id = `${options.src}:${AtlasHasher.getAtlasHash(options.atlas)}`;
        this._animation = options.animation;
        this.load();
    }
    changeAnimation() {
        if (!this.sheet)
            return;
        this.currentSprite?.destroy();
        if (this.options.atlas.animations?.[this.animation].length === 1) {
            const frame = this.options.atlas.animations[this.animation][0];
            const texture = this.sheet.textures[frame];
            if (!texture) {
                throw new Error(`Failed to load texture: ${this.options.src}`);
            }
            const sprite = new PixiSprite({ texture, anchor: { x: 0.5, y: 0.5 } });
            this.container.addChild(sprite);
            this.currentSprite = sprite;
        }
        else {
            const sprite = new PixiAnimatedSprite(this.sheet.animations[this.animation]);
            sprite.loop = this.options.loop ?? true;
            sprite.onLoop = () => this.options.onAnimationEnd?.(this.animation);
            sprite.onComplete = () => this.options.onAnimationEnd?.(this.animation);
            sprite.anchor.set(0.5, 0.5);
            sprite.animationSpeed = this.options.fps / 60;
            sprite.play();
            this.container.addChild(sprite);
            this.currentSprite = sprite;
        }
    }
    async load() {
        this.sheet = await SpritesheetLoader.load(this.id, this.options.src, this.options.atlas);
        if (!this.sheet || this.isRemoved())
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
    get loop() {
        return this.currentSprite instanceof PixiAnimatedSprite
            ? this.currentSprite.loop
            : false;
    }
    set loop(loop) {
        if (this.currentSprite instanceof PixiAnimatedSprite) {
            this.currentSprite.loop = loop;
        }
    }
    remove() {
        SpritesheetLoader.release(this.id);
        super.remove();
    }
}
//# sourceMappingURL=AnimatedSprite.js.map