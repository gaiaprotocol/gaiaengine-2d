import { FontLoader } from "@common-module/app";
import { Text as PixiText } from "pixi.js";
import GameObject from "../core/GameObject.js";
export default class TextNode extends GameObject {
    text;
    style;
    pixiText;
    constructor(x, y, text, style) {
        super(x, y);
        this.text = text;
        this.style = style;
        this.draw();
        this.loadFont();
    }
    draw() {
        this.pixiText?.destroy();
        this.pixiText = new PixiText({
            text: this.text,
            style: this.style,
            anchor: 0.5,
        });
        this.container.addChild(this.pixiText);
    }
    async loadFont() {
        if (typeof this.style.fontFamily === "string") {
            const loaded = await FontLoader.load(this.style.fontFamily);
            if (!loaded || this.removed)
                return;
            this.draw();
        }
    }
}
//# sourceMappingURL=TextNode.js.map