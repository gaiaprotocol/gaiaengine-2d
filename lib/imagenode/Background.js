import { Assets, TilingSprite } from "pixi.js";
import Movable from "../object/Movable.js";
export default class Background extends Movable {
    constructor(src, options) {
        super(new TilingSprite(), options);
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
}
//# sourceMappingURL=Background.js.map