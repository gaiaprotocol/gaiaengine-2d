import { BodyNode, DomNode } from "@common-module/app";

export default class Letterbox extends DomNode {
  constructor(style: Partial<CSSStyleDeclaration>) {
    super();
    this.style({
      position: "fixed",
      zIndex: "999997",
      backgroundColor: "#000000",
      ...style,
    });
    this.appendTo(BodyNode);
  }
}
