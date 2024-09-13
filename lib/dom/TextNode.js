import DomWrapperNode from "./DomWrapperNode.js";
export default class TextNode extends DomWrapperNode {
    constructor(x, y, text) {
        super(x, y, "", text);
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