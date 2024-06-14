import { DomNode } from "@common-module/app";
import Node from "../base/Node.js";
export default class Dom extends Node {
    domNode;
    constructor(x, y, tag, ...children) {
        super(x, y);
        this.domNode = new DomNode(tag, ...children);
        this.domNode.style({
            position: "absolute",
            left: -9999999,
            top: -9999999,
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
    beforeLeft = -9999999;
    beforeTop = -9999999;
    update(deltaTime) {
        super.update(deltaTime);
        if (this.screen) {
            const left = this.worldTransform.x * this.screen.ratio;
            const top = this.worldTransform.y * this.screen.ratio;
            if (this.beforeLeft !== left || this.beforeTop !== top) {
                this.beforeLeft = left;
                this.beforeTop = top;
                this.domNode.style({
                    transform: `scale(${this.worldTransform.scaleX * this.screen.ratio}, ${this.worldTransform.scaleY * this.screen.ratio})`,
                });
                const rect = this.domNode.rect;
                this.domNode.style({
                    left: left - rect.width / 2 / this.screen.ratio,
                    top: top - rect.height / 2 / this.screen.ratio,
                });
            }
        }
    }
    delete() {
        this.domNode.delete();
        super.delete();
    }
}
//# sourceMappingURL=Dom.js.map