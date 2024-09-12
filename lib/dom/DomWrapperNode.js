import { DomNode } from "@common-module/app";
import GameNode from "../core/GameNode.js";
export default class DomWrapperNode extends GameNode {
    domNode;
    constructor(x, y, elementOrSelector, ...children) {
        super();
        this.domNode = new DomNode(elementOrSelector, ...children).style({
            position: "absolute",
            left: "-9999999px",
            top: "-9999999px",
        });
    }
}
//# sourceMappingURL=DomWrapperNode.js.map