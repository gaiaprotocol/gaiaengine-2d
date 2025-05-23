import { Sprite as PixiSprite } from "pixi.js";
import SpritesheetLoader from "../loaders/SpritesheetLoader.js";
import TextureLoader from "../loaders/TextureLoader.js";
import AtlasHasher from "./AtlasHasher.js";
import BaseImageSprite from "./BaseImageSprite.js";
export default class Sprite extends BaseImageSprite {
    atlas;
    frame;
    id;
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
            this.id = `${src}:${AtlasHasher.getAtlasHash(this.atlas)}`;
            const sheet = await SpritesheetLoader.load(this.id, src, this.atlas);
            if (!sheet || this.isRemoved())
                return;
            const texture = sheet.textures[this.frame];
            if (!texture)
                throw new Error(`Failed to load texture: ${src}`);
            this.container.addChild(new PixiSprite({ texture, anchor: { x: 0.5, y: 0.5 } }));
        }
        else {
            const texture = await TextureLoader.load(src);
            if (!texture || this.isRemoved())
                return;
            this.container.addChild(new PixiSprite({ texture, anchor: { x: 0.5, y: 0.5 } }));
        }
    }
    releaseTexture(src) {
        this.atlas
            ? SpritesheetLoader.release(this.id)
            : TextureLoader.release(src);
    }
}
//# sourceMappingURL=Sprite.js.map