import { TilingSprite } from "pixi.js";
import Node from "../base/Node.js";
import TextureLoader from "../texture/TextureLoader.js";
export default class Background extends Node {
    options;
    _src;
    tilingSprite;
    constructor(src, options) {
        super(0, 0);
        this.options = options;
        this.src = src;
    }
    async load(src) {
        const texture = await TextureLoader.load(src);
        if (!texture || this.deleted)
            return;
        this.container.addChild(this.tilingSprite = new TilingSprite({
            texture,
            width: texture.width,
            height: texture.height,
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
    update(deltaTime) {
        if (this.tilingSprite && this.options?.scrollSpeedX) {
            this.tilingSprite.tilePosition.x += this.options.scrollSpeedX * deltaTime;
        }
        super.update(deltaTime);
    }
    delete() {
        if (this._src)
            TextureLoader.release(this._src);
        super.delete();
    }
}
//# sourceMappingURL=Background.js.map