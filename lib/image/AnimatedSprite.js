import { AnimatedSprite as PixiAnimatedSprite, Sprite as PixiSprite, } from "pixi.js";
import GameObject from "../core/GameObject.js";
import SpritesheetLoader from "../loaders/SpritesheetLoader.js";
import AtlasHasher from "./AtlasHasher.js";
export default class AnimatedSprite extends GameObject {
    src;
    atlas;
    animation;
    fps;
    id;
    animatedSprite;
    constructor(x, y, src, atlas, animation, fps) {
        super(x, y);
        this.src = src;
        this.atlas = atlas;
        this.animation = animation;
        this.fps = fps;
        this.id = `${src}:${AtlasHasher.getAtlasHash(atlas)}`;
        this.load();
    }
    async load() {
        const sheet = await SpritesheetLoader.load(this.id, this.src, this.atlas);
        if (!sheet || this.removed)
            return;
        if (this.atlas.animations?.[this.animation].length === 1) {
            const frame = this.atlas.animations[this.animation][0];
            const texture = sheet.textures[frame];
            if (!texture)
                throw new Error(`Failed to load texture: ${this.src}`);
            this.container.addChild(new PixiSprite({ texture, anchor: { x: 0.5, y: 0.5 } }));
        }
        else {
            this.container.addChild(this.animatedSprite = new PixiAnimatedSprite(sheet.animations[this.animation]));
            this.animatedSprite.anchor.set(0.5, 0.5);
            this.animatedSprite.animationSpeed = this.fps / 60;
            this.animatedSprite.play();
        }
    }
    remove() {
        SpritesheetLoader.release(this.id);
        super.remove();
    }
}
//# sourceMappingURL=AnimatedSprite.js.map