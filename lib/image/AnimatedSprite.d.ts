import { SpritesheetData } from "pixi.js";
import Node from "../base/Node.js";
export default class AnimatedSprite extends Node {
    private atlas;
    private animation;
    private fps;
    private _src;
    private animatedSprite;
    constructor(x: number, y: number, src: string, atlas: SpritesheetData, animation: string, fps: number);
    private load;
    set src(src: string);
    get src(): string;
    delete(): void;
}
//# sourceMappingURL=AnimatedSprite.d.ts.map