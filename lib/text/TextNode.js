import { FontLoader } from "@commonmodule/app";
import { Text as PixiText } from "pixi.js";
import GameObject from "../core/GameObject.js";
export default class TextNode extends GameObject {
    text;
    style;
    extraOptions;
    pixiText;
    constructor(x, y, text, style, extraOptions) {
        super(x, y);
        this.text = text;
        this.style = style;
        this.extraOptions = extraOptions;
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
        if (this.extraOptions?.textAnchorX !== undefined) {
            this.pixiText.anchor.x = this.extraOptions.textAnchorX + 0.5;
        }
        if (this.extraOptions?.textAnchorY !== undefined) {
            this.pixiText.anchor.y = this.extraOptions.textAnchorY + 0.5;
        }
        this.container.addChild(this.pixiText);
    }
    async loadFont() {
        if (typeof this.style.fontFamily === "string" &&
            !FontLoader.isLoaded(this.style.fontFamily)) {
            const loaded = await FontLoader.load(this.style.fontFamily);
            if (!loaded || this.removed)
                return;
            this.draw();
        }
    }
}
//# sourceMappingURL=TextNode.js.map