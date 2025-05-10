import { el } from "@commonmodule/app";
import DomWrapperNode from "../dom/DomWrapperNode.js";
export default class DomTextNode extends DomWrapperNode {
    constructor(x, y, text, style) {
        super(x, y, el("", text));
        if (style)
            this.dom.style(style);
    }
    set text(text) {
        this.dom.text = text;
    }
    get text() {
        return this.dom.text;
    }
}
//# sourceMappingURL=DomTextNode.js.map