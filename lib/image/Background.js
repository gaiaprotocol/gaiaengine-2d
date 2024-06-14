import { Assets, TilingSprite } from "pixi.js";
import Node from "../base/Node.js";
export default class Background extends Node {
    _src;
    options;
    tilingSprite;
    constructor(_src, options) {
        super(0, 0);
        this._src = _src;
        this.options = options;
        this.src = _src;
    }
    async load(src) {
        const texture = await Assets.load(src);
        this.container.addChild(this.tilingSprite = new TilingSprite({
            texture,
            width: texture.width,
            height: texture.height,
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
    update(deltaTime) {
        if (this.tilingSprite && this.options?.scrollSpeedX) {
            this.tilingSprite.tilePosition.x += this.options.scrollSpeedX * deltaTime;
        }
        super.update(deltaTime);
    }
}
//# sourceMappingURL=Background.js.map