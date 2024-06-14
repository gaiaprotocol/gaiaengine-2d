import { Style } from "@common-module/app";
import Dom from "./Dom.js";

export default class Text extends Dom {
  constructor(x: number, y: number, text: string, style?: Style) {
    super(x, y, "", text);
    if (style) this.domNode.style(style);
  }

  public set text(text: string) {
    this.domNode.text = text;
  }

  public get text() {
    return this.domNode.text;
  }
}
