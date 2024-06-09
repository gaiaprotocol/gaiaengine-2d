import { TilingSprite } from "pixi.js";
import Movable, { MovableOptions } from "../object/Movable.js";
export default class Background extends Movable<TilingSprite> {
    constructor(src: string, options?: MovableOptions);
    private load;
    set src(src: string);
}
//# sourceMappingURL=Background.d.ts.map