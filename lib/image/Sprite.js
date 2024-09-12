import { Sprite as PixiSprite } from "pixi.js";
import GameObject from "../core/GameObject.js";
import TextureLoader from "../loaders/TextureLoader.js";
export default class Sprite extends GameObject {
    _src;
    constructor(x, y, src) {
        super(x, y);
        this.src = src;
    }
    async load(src) {
        const texture = await TextureLoader.load(src);
        this.container.addChild(new PixiSprite({ texture, anchor: { x: 0.5, y: 0.5 } }));
    }
    set src(src) {
        if (this._src === src)
            return;
        this._src = src;
        this.load(src);
    }
    get src() {
        return this._src ?? "";
    }
}
//# sourceMappingURL=Sprite.js.map