import { Rectangle, Sprite, Texture } from "pixi.js";
import GameObject from "../core/GameObject.js";
import BitmapFontLoader from "../loaders/BitmapFontLoader.js";
export default class BitmapTextNode extends GameObject {
    text;
    options;
    constructor(x, y, text, options) {
        super(x, y);
        this.text = text;
        this.options = options;
        this.loadFont();
    }
    async loadFont() {
        const font = await BitmapFontLoader.load(this.options.fnt, this.options.src);
        if (!font || this.isRemoved())
            return;
        const sprites = [];
        let xPos = 0;
        let yPos = 0;
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;
        for (let i = 0; i < this.text.length; i++) {
            const charCode = this.text.charCodeAt(i);
            if (charCode === 10) {
                xPos = 0;
                yPos += font.lineHeight;
                continue;
            }
            const char = font.chars[charCode];
            if (!char)
                continue;
            const frame = new Rectangle(char.x, char.y, char.width, char.height);
            const texture = new Texture({ source: font.texture.source, frame });
            const sprite = new Sprite(texture);
            const x0 = xPos + char.xoffset;
            const y0 = yPos + char.yoffset;
            sprite.x = x0;
            sprite.y = y0;
            sprites.push(sprite);
            const x1 = x0 + char.width;
            const y1 = y0 + char.height;
            if (x0 < minX)
                minX = x0;
            if (y0 < minY)
                minY = y0;
            if (x1 > maxX)
                maxX = x1;
            if (y1 > maxY)
                maxY = y1;
            xPos += char.xadvance;
        }
        if (minX === Infinity) {
            minX = 0;
            minY = 0;
        }
        if (maxX === -Infinity) {
            maxX = 0;
            maxY = 0;
        }
        const width = maxX - minX;
        const height = maxY - minY;
        for (const sprite of sprites) {
            sprite.x -= width / 2;
            sprite.y -= height / 2;
            this.container.addChild(sprite);
        }
    }
}
//# sourceMappingURL=BitmapTextNode.js.map