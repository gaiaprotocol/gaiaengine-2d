import { Sprite } from "pixi.js";
import Node from "../base/Node.js";
import TextureLoader from "../texture/TextureLoader.js";
export default class Image extends Node {
    _src;
    constructor(x, y, src) {
        super(x, y);
        this.src = src;
    }
    async load(src) {
        const texture = await TextureLoader.load(src);
        if (!texture || this.deleted)
            return;
        this.container.addChild(new Sprite({
            texture,
            anchor: { x: 0.5, y: 0.5 },
        }));
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
//# sourceMappingURL=Image.js.map