import { Dom } from "@commonmodule/app";
import { DOMContainer } from "pixi.js";
import DisplayNode from "../core/DisplayNode.js";

export default class DomContainerNode extends DisplayNode {
  constructor(x: number, y: number, public dom: Dom) {
    super(new DOMContainer({ x, y, element: dom.htmlElement }));
  }
}
