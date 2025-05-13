import { DOMContainer } from "pixi.js";
import DisplayNode from "../core/DisplayNode.js";
export default class DomContainerNode extends DisplayNode {
    dom;
    constructor(x, y, dom) {
        super(new DOMContainer({ x, y, element: dom.htmlElement }));
        this.dom = dom;
    }
}
//# sourceMappingURL=DomContainerNode.js.map