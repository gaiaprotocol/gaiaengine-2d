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
        document.fonts.addEventListener("loadingdone", this.clearBefore);
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
    beforeScaleX = 1;
    beforeScaleY = 1;
    clearBefore = () => {
        this.beforeLeft = -9999999;
        this.beforeTop = -9999999;
        this.beforeScaleX = 1;
        this.beforeScaleY = 1;
    };
    update(deltaTime) {
        super.update(deltaTime);
        if (this.screen) {
            const left = (this.worldTransform.x * this.worldTransform.scaleX +
                this.screen.width / 2) *
                this.screen.ratio;
            const top = (this.worldTransform.y * this.worldTransform.scaleY +
                this.screen.height / 2) *
                this.screen.ratio;
            const scaleX = this.worldTransform.scaleX * this.screen.ratio;
            const scaleY = this.worldTransform.scaleY * this.screen.ratio;
            if (this.beforeLeft !== left || this.beforeTop !== top ||
                this.beforeScaleX !== scaleX || this.beforeScaleY !== scaleY) {
                this.beforeLeft = left;
                this.beforeTop = top;
                this.beforeScaleX = scaleX;
                this.beforeScaleY = scaleY;
                this.domNode.style({ transform: `scale(${scaleX}, ${scaleY})` });
                const rect = this.domNode.rect;
                this.domNode.style({
                    left: left - rect.width / 2 / scaleX,
                    top: top - rect.height / 2 / scaleY,
                });
            }
        }
    }
    delete() {
        this.domNode.delete();
        document.fonts.removeEventListener("loadingdone", this.clearBefore);
        super.delete();
    }
}
//# sourceMappingURL=Dom.js.map