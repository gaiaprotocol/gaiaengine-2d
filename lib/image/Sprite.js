import { Sprite as PixiSprite } from "pixi.js";
import SpritesheetLoader from "../loaders/SpritesheetLoader.js";
import TextureLoader from "../loaders/TextureLoader.js";
import BaseSprite from "./BaseSprite.js";
export default class Sprite extends BaseSprite {
    atlas;
    frame;
    constructor(x, y, src, atlas, frame) {
        super(x, y);
        this.atlas = atlas;
        this.frame = frame;
        this.src = src;
    }
    async loadTexture(src) {
        if (this.atlas) {
            if (!this.frame)
                throw new Error("Frame not found");
            const sheet = await SpritesheetLoader.load(src, this.atlas);
            if (!sheet || this.removed)
                return;
            const texture = sheet.textures[this.frame];
            if (!texture)
                throw new Error(`Failed to load texture: ${src}`);
            this.container.addChild(new PixiSprite({ texture, anchor: { x: 0.5, y: 0.5 } }));
        }
        else {
            const texture = await TextureLoader.load(src);
            if (!texture || this.removed)
                return;
            this.container.addChild(new PixiSprite({ texture, anchor: { x: 0.5, y: 0.5 } }));
        }
    }
    releaseTexture(src) {
        this.atlas ? SpritesheetLoader.release(src) : TextureLoader.release(src);
    }
}
//# sourceMappingURL=Sprite.js.map