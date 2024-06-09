import { BodyNode, DomNode } from "@common-module/app";
import Screen from "./Screen.js";
class Letterbox extends DomNode {
    constructor(style) {
        super();
        this.style({
            position: "absolute",
            zIndex: 9999998,
            backgroundColor: "#000000",
            ...style,
        });
    }
}
export default class LetterboxedScreen extends Screen {
    letterboxes = {
        top: new Letterbox({ left: 0, top: 0, width: "100%" }).appendTo(this),
        bottom: new Letterbox({ left: 0, bottom: 0, width: "100%" }).appendTo(this),
        left: new Letterbox({ left: 0, top: 0, height: "100%" }).appendTo(this),
        right: new Letterbox({ right: 0, top: 0, height: "100%" }).appendTo(this),
    };
    constructor(width, height, ...nodes) {
        super(...nodes);
        this.style({
            position: "fixed",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
        });
        window.addEventListener("resize", this.resize);
        BodyNode.append(this);
    }
    resize = () => {
    };
    delete() {
        window.removeEventListener("resize", this.resize);
        super.delete();
    }
}
//# sourceMappingURL=LetterboxedScreen.js.map