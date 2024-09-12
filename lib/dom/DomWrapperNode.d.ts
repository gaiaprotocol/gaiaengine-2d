import { DomChild, DomSelector } from "@common-module/app";
import GameNode from "../core/GameNode.js";
export default class DomWrapperNode<HE extends HTMLElement = HTMLElement> extends GameNode {
    private domNode;
    constructor(x: number, y: number, elementOrSelector?: HE | DomSelector, ...children: DomChild<HE>[]);
}
//# sourceMappingURL=DomWrapperNode.d.ts.map