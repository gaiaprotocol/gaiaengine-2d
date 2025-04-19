import { BodyNode, DomNode } from "@commonmodule/app";
export default class Letterbox extends DomNode {
    constructor(style) {
        super();
        this.style({
            position: "fixed",
            zIndex: "999997",
            backgroundColor: "#000000",
            ...style,
        });
        this.appendTo(BodyNode);
    }
}
//# sourceMappingURL=Letterbox.js.map