import Node from "../base/Node.js";
export default class Image extends Node {
    private _src;
    constructor(x: number, y: number, src: string);
    private load;
    set src(src: string);
    get src(): string;
    get width(): number;
    get height(): number;
    delete(): void;
}
//# sourceMappingURL=Image.d.ts.map