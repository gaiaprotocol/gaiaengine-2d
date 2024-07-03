import { SpritesheetData } from "pixi.js";
import Node from "../base/Node.js";
export default class Sprite extends Node {
    private atlas?;
    private frame?;
    private _src;
    constructor(x: number, y: number, src: string, atlas?: SpritesheetData | undefined, frame?: string | undefined);
    private load;
    set src(src: string);
    get src(): string;
    get width(): number;
    get height(): number;
    delete(): void;
}
//# sourceMappingURL=Sprite.d.ts.map