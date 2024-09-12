import { DomChild, DomNode, DomSelector } from "@common-module/app";
import GameNode from "../core/GameNode.js";

export default class DomWrapperNode<
  HE extends HTMLElement = HTMLElement,
> extends GameNode {
  private domNode: DomNode;

  constructor(
    x: number,
    y: number,
    elementOrSelector?: HE | DomSelector,
    ...children: DomChild<HE>[]
  ) {
    super();
    this.domNode = new DomNode(elementOrSelector, ...children);
  }
}
