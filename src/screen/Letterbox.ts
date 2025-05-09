import { Dom } from "@commonmodule/app";

export default class Letterbox extends Dom {
  constructor(style: Partial<CSSStyleDeclaration>) {
    super();
    this.style({
      position: "fixed",
      zIndex: "999997",
      backgroundColor: "#000000",
      ...style,
    });
  }
}
