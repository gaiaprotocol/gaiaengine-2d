import { Assets, TilingSprite } from "pixi.js";
import GameNode from "../GameNode.js";
export default class Background extends GameNode {
    options;
    constructor(src, options) {
        super(0, 0, new TilingSprite());
        this.options = options;
        this.container.anchor.set(0.5, 0.5);
        this.src = src;
    }
    async load(src) {
        const texture = await Assets.load(src);
        this.container._width = texture.width;
        this.container._height = texture.height;
        this.container.texture = texture;
    }
    set src(src) {
        this.load(src);
    }
    step(deltaTime) {
        if (this.options?.scrollSpeedX) {
            this.container.tilePosition.x += this.options.scrollSpeedX * deltaTime;
        }
        super.step(deltaTime);
    }
}
//# sourceMappingURL=Background.js.map