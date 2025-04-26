import { TilingSprite } from "pixi.js";
import TextureLoader from "../loaders/TextureLoader.js";
import BaseImageSprite from "./BaseImageSprite.js";
export default class Background extends BaseImageSprite {
    options;
    tilingSprite;
    _scrollSpeedX = 0;
    _scrollSpeedY = 0;
    constructor(src, options) {
        super(0, 0);
        this.options = options;
        this._scrollSpeedX = options?.scrollSpeedX ?? 0;
        this._scrollSpeedY = options?.scrollSpeedY ?? 0;
        this.src = src;
    }
    async loadTexture(src) {
        const texture = await TextureLoader.load(src);
        if (!texture || this.removed)
            return;
        this.container.addChild(this.tilingSprite = new TilingSprite({
            texture,
            width: texture.width,
            height: texture.height,
            anchor: { x: 0.5, y: 0.5 },
        }));
    }
    releaseTexture(src) {
        TextureLoader.release(src);
    }
    update(deltaTime) {
        if (this.tilingSprite) {
            if (this._scrollSpeedX) {
                this.tilingSprite.tilePosition.x += this._scrollSpeedX * deltaTime;
            }
            if (this._scrollSpeedY) {
                this.tilingSprite.tilePosition.y += this._scrollSpeedY * deltaTime;
            }
        }
        super.update(deltaTime);
    }
    set scrollSpeedX(value) {
        this._scrollSpeedX = value;
    }
    get scrollSpeedX() {
        return this._scrollSpeedX;
    }
    set scrollSpeedY(value) {
        this._scrollSpeedY = value;
    }
    get scrollSpeedY() {
        return this._scrollSpeedY;
    }
}
//# sourceMappingURL=Background.js.map