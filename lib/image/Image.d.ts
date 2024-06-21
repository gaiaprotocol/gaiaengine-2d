import Node from "../base/Node.js";
export default class Image extends Node {
    private onLoaded?;
    private _src;
    constructor(x: number, y: number, src: string, onLoaded?: (() => void) | undefined);
    private load;
    set src(src: string);
    get src(): string;
    get width(): number;
    get height(): number;
    delete(): void;
}
//# sourceMappingURL=Image.d.ts.map