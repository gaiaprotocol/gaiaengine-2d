import Node from "../base/Node.js";
export default class Sprite extends Node {
    private _src;
    private frameCount;
    private fps;
    private animatedSprite;
    constructor(x: number, y: number, _src: string, frameCount: number, fps: number);
    private load;
    set src(src: string);
    get src(): string;
    delete(): void;
}
//# sourceMappingURL=Sprite.d.ts.map