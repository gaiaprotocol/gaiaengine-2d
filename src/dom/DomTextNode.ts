import DomWrapperNode from "./DomWrapperNode.js";

export default class DomTextNode<ST extends Partial<CSSStyleDeclaration>>
  extends DomWrapperNode {
  constructor(x: number, y: number, text: string, style: ST) {
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
