import { TilingSprite } from "pixi.js";
import TextureLoader from "../loaders/TextureLoader.js";
import BaseSprite from "./BaseSprite.js";
export default class Background extends BaseSprite {
    options;
    tilingSprite;
    constructor(src, options) {
        super(0, 0);
        this.options = options;
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
        if (this.tilingSprite && this.options?.scrollSpeedX) {
            this.tilingSprite.tilePosition.x += this.options.scrollSpeedX * deltaTime;
        }
        super.update(deltaTime);
    }
}
//# sourceMappingURL=Background.js.map