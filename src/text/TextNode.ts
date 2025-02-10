import { FontLoader } from "@common-module/app";
import { Text as PixiText, TextStyleOptions } from "pixi.js";
import GameObject from "../core/GameObject.js";

export default class TextNode extends GameObject {
  private pixiText?: PixiText;

  constructor(
    x: number,
    y: number,
    private text: string,
    private style: TextStyleOptions,
    private extraOptions?: { textAnchorX?: number; textAnchorY?: number },
  ) {
    super(x, y);
    this.draw();
    this.loadFont();
  }

  private draw() {
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

  private async loadFont() {
    if (
      typeof this.style.fontFamily === "string" &&
      !FontLoader.isLoaded(this.style.fontFamily)
    ) {
      const loaded = await FontLoader.load(this.style.fontFamily);
      if (!loaded || this.removed) return;
      this.draw();
    }
  }
}
