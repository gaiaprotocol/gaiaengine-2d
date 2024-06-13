import { Assets, Sprite } from "pixi.js";
import Node from "../base/Node.js";
export default class Image extends Node {
    _src;
    sprite;
    constructor(_src) {
        super(0, 0);
        this._src = _src;
        this.src = _src;
    }
    async load(src) {
        const texture = await Assets.load(src);
        this.container.addChild(this.sprite = new Sprite({
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
}
//# sourceMappingURL=Image.js.map