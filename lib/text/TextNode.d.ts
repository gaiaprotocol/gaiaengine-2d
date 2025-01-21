import { TextStyleOptions } from "pixi.js";
import GameObject from "../core/GameObject.js";
export default class TextNode extends GameObject {
    private text;
    private style;
    private pixiText?;
    constructor(x: number, y: number, text: string, style: TextStyleOptions);
    private draw;
    private loadFont;
}
//# sourceMappingURL=TextNode.d.ts.map