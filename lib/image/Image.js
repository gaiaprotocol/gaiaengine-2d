import { Sprite } from "pixi.js";
import Node from "../base/Node.js";
import TextureLoader from "../texture/TextureLoader.js";
export default class Image extends Node {
    _src;
    constructor(x, y, _src) {
        super(x, y);
        this._src = _src;
        this.src = _src;
    }
    async load(src) {
        const texture = await TextureLoader.load(src);
        this.container.addChild(new Sprite({
            texture,
            anchor: { x: 0.5, y: 0.5 },
        }));
    }
    set src(src) {
        this._src = src;
        this.load(src);
    }
    get src() {
        return this._src;
    }
    delete() {
        TextureLoader.release(this._src);
        super.delete();
    }
}
//# sourceMappingURL=Image.js.map