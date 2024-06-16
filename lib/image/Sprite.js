import { AnimatedSprite, Spritesheet, } from "pixi.js";
import Node from "../base/Node.js";
import TextureLoader from "../texture/TextureLoader.js";
export default class Sprite extends Node {
    frameCount;
    fps;
    _src;
    animatedSprite;
    constructor(x, y, src, frameCount, fps) {
        super(x, y);
        this.frameCount = frameCount;
        this.fps = fps;
        this.src = src;
    }
    async load(src) {
        const texture = await TextureLoader.load(src);
        if (!texture || this.deleted)
            return;
        const frameWidth = texture.width / this.frameCount;
        const frames = {};
        for (let i = 0; i < this.frameCount; i++) {
            frames[`sprite-${i}.png`] = {
                frame: {
                    x: i * frameWidth,
                    y: 0,
                    w: frameWidth,
                    h: texture.height,
                },
            };
        }
        const spritesheet = new Spritesheet(texture, {
            frames,
            meta: {
                image: this.src,
                scale: 1,
            },
            animations: {
                sprite: Array.from({ length: this.frameCount }, (_, i) => `sprite-${i}.png`),
            },
        });
        await spritesheet.parse();
        this.container.addChild(this.animatedSprite = new AnimatedSprite(spritesheet.animations.sprite));
        this.animatedSprite.anchor.set(0.5, 0.5);
        this.animatedSprite.animationSpeed = this.fps / 60;
        this.animatedSprite.play();
    }
    set src(src) {
        if (this._src === src)
            return;
        if (this._src)
            TextureLoader.release(this._src);
        this._src = src;
        this.load(src);
    }
    get src() {
        return this._src ?? "";
    }
    delete() {
        if (this._src)
            TextureLoader.release(this._src);
        super.delete();
    }
}
//# sourceMappingURL=Sprite.js.map