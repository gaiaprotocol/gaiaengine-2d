import Dom from "./Dom.js";
export default class Text extends Dom {
    constructor(x, y, text, style) {
        super(x, y, "", text);
        if (style)
            this.domNode.style(style);
    }
    set text(text) {
        this.domNode.text = text;
    }
    get text() {
        return this.domNode.text;
    }
}
//# sourceMappingURL=Text.js.map