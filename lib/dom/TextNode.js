import DomWrapperNode from "./DomWrapperNode.js";
export default class TextNode extends DomWrapperNode {
    constructor(x, y, text, style) {
        super(x, y, "", text);
        if (style)
            this.domNode.style(style);
    }
    set text(text) {
        this.domNode.text = text;
        this.resetPreviousTransform();
    }
    get text() {
        return this.domNode.text;
    }
}
//# sourceMappingURL=TextNode.js.map