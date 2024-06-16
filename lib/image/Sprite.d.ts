import Node from "../base/Node.js";
export default class Sprite extends Node {
    private frameCount;
    private fps;
    private _src;
    private animatedSprite;
    constructor(x: number, y: number, src: string, frameCount: number, fps: number);
    private load;
    set src(src: string);
    get src(): string;
    delete(): void;
}
//# sourceMappingURL=Sprite.d.ts.map