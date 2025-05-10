import DomWrapperNode from "../dom/DomWrapperNode.js";

export default class DomTextNode<ST extends Partial<CSSStyleDeclaration> = {}>
  extends DomWrapperNode {
  constructor(x: number, y: number, text: string, style: ST) {
    super(x, y, "", text);
    if (style) this.dom.style(style);
  }

  public set text(text: string) {
    this.dom.text = text;
  }

  public get text() {
    return this.dom.text;
  }
}
