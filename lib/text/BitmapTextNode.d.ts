import GameObject from "../core/GameObject.js";
interface BitmapTextNodeOptions {
    fnt: string;
    src: string;
}
export default class BitmapTextNode extends GameObject {
    private text;
    private options;
    constructor(x: number, y: number, text: string, options: BitmapTextNodeOptions);
    private loadFont;
}
export {};
//# sourceMappingURL=BitmapTextNode.d.ts.map