import { TilingSprite } from "pixi.js";
import GameNode from "../GameNode.js";
interface BackgroundOptions {
    scrollSpeedX?: number;
}
export default class Background extends GameNode<TilingSprite> {
    private options?;
    constructor(src: string, options?: BackgroundOptions | undefined);
    private load;
    set src(src: string);
    step(deltaTime: number): void;
}
export {};
//# sourceMappingURL=Background.d.ts.map