import { Texture } from "pixi.js";
export interface Char {
    x: number;
    y: number;
    width: number;
    height: number;
    xoffset: number;
    yoffset: number;
    xadvance: number;
}
export default interface BitmapFont {
    chars: Record<number, Char>;
    texture: Texture;
    size: number;
    lineHeight: number;
}
//# sourceMappingURL=BitmapFont.d.ts.map