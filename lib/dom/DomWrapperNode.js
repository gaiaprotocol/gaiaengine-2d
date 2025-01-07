import { DomNode } from "@common-module/app";
import GameObject from "../core/GameObject.js";
export default class DomWrapperNode extends GameObject {
    domNode;
    constructor(x, y, elementOrSelector, ...children) {
        super(x, y);
        this.domNode = new DomNode(elementOrSelector, ...children).style({
            position: "absolute",
            left: "-9999999px",
            top: "-9999999px",
        });
    }
    set screen(screen) {
        if (screen)
            this.domNode.appendTo(screen);
        super.screen = screen;
    }
    get screen() {
        return super.screen;
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.domNode.style({
            left: `${this.globalTransform.x}px`,
            top: `${this.globalTransform.y}px`,
            transform: `translate(-50%, -50%) scale(${this.globalTransform.scaleX}, ${this.globalTransform.scaleY}) rotate(${this.globalTransform.rotation}rad)`,
            opacity: String(this.globalTransform.alpha),
        });
    }
    remove() {
        this.domNode.remove();
        super.remove();
    }
}
//# sourceMappingURL=DomWrapperNode.js.map