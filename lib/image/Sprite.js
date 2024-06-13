import { AnimatedSprite, Assets, Spritesheet, } from "pixi.js";
import Node from "../base/Node.js";
export default class Sprite extends Node {
    _src;
    frameCount;
    fps;
    animatedSprite;
    constructor(_src, frameCount, fps) {
        super(0, 0);
        this._src = _src;
        this.frameCount = frameCount;
        this.fps = fps;
        this.src = _src;
    }
    async load(src) {
        const texture = await Assets.load(src);
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
        this._src = src;
        this.load(src);
    }
    get src() {
        return this._src;
    }
}
//# sourceMappingURL=Sprite.js.map