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
    this.container.addChild(this.pixiText);
  }

  private async loadFont() {
    if (typeof this.style.fontFamily === "string") {
      const loaded = await FontLoader.load(this.style.fontFamily);
      if (!loaded || this.removed) return;
      this.draw();
    }
  }
}
