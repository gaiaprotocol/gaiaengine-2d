import DomWrapperNode from "./DomWrapperNode.js";

export default class TextNode<ST extends Partial<CSSStyleDeclaration>>
  extends DomWrapperNode {
  constructor(x: number, y: number, text: string, style: ST) {
    super(x, y, "", text);
  }

  public set text(text: string) {
    this.domNode.text = text;
    this.resetPreviousTransform();
  }

  public get text() {
    return this.domNode.text;
  }
}
