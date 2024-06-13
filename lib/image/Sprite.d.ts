import Node from "../base/Node.js";
export default class Sprite extends Node {
    private _src;
    private frameCount;
    private fps;
    private animatedSprite;
    constructor(_src: string, frameCount: number, fps: number);
    private load;
    set src(src: string);
    get src(): string;
}
//# sourceMappingURL=Sprite.d.ts.map