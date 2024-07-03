import { Sprite as PixiSprite } from "pixi.js";
import Node from "../base/Node.js";
import SpritesheetLoader from "../texture/SpritesheetLoader.js";
import TextureLoader from "../texture/TextureLoader.js";
export default class Sprite extends Node {
    atlas;
    frame;
    _src;
    constructor(x, y, src, atlas, frame) {
        super(x, y);
        this.atlas = atlas;
        this.frame = frame;
        this.src = src;
    }
    async load(src) {
        if (this.atlas) {
            if (!this.frame)
                throw new Error("Frame not found");
            const sheet = await SpritesheetLoader.load(src, this.atlas);
            if (!sheet || this.deleted)
                return;
            const texture = sheet.textures[this.frame];
            if (!texture)
                throw new Error(`Failed to load texture: ${src}`);
            this.container.addChild(new PixiSprite({ texture, anchor: { x: 0.5, y: 0.5 } }));
        }
        else {
            const texture = await TextureLoader.load(src);
            if (!texture || this.deleted)
                return;
            this.container.addChild(new PixiSprite({ texture, anchor: { x: 0.5, y: 0.5 } }));
        }
    }
    set src(src) {
        if (this._src === src)
            return;
        if (this._src) {
            this.atlas
                ? SpritesheetLoader.release(this._src)
                : TextureLoader.release(this._src);
        }
        this._src = src;
        this.load(src);
    }
    get src() {
        return this._src ?? "";
    }
    get width() {
        return this.container.width;
    }
    get height() {
        return this.container.height;
    }
    delete() {
        if (this._src) {
            this.atlas
                ? SpritesheetLoader.release(this._src)
                : TextureLoader.release(this._src);
        }
        super.delete();
    }
}
//# sourceMappingURL=Sprite.js.map