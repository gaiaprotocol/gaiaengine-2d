import { Dom } from "@commonmodule/app";
import TransformableNode from "../core/TransformableNode.js";
export default class DomWrapperNode extends TransformableNode {
    dom;
    constructor(x, y, elementOrSelector, ...children) {
        super(x, y);
        this.dom = new Dom(elementOrSelector, ...children).style({
            position: "absolute",
            left: "-9999999px",
            top: "-9999999px",
        });
    }
    set screen(screen) {
        if (screen)
            this.dom.appendTo(screen);
        super.screen = screen;
    }
    get screen() {
        return super.screen;
    }
    updateStyle() {
        if (this.screen) {
            this.dom.style({
                left: `${this.globalTransform.x * this.screen.scale}px`,
                top: `${this.globalTransform.y * this.screen.scale}px`,
                transform: `translate(-50%, -50%) scale(${this.globalTransform.scaleX * this.screen.scale}, ${this.globalTransform.scaleY * this.screen.scale}) rotate(${this.globalTransform.rotation}rad)`,
                opacity: String(this.globalTransform.alpha),
            });
        }
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.updateStyle();
    }
    appendTo(parent, index) {
        super.appendTo(parent, index);
        this.updateStyle();
        return this;
    }
    remove() {
        this.dom.remove();
        super.remove();
    }
}
//# sourceMappingURL=DomWrapperNode.js.map