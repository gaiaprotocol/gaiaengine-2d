import { DomNode } from "@common-module/app";
import TransformableNode from "../core/TransformableNode.js";
import GaiaEngineConfig from "../GaiaEngineConfig.js";
export default class DomWrapperNode extends TransformableNode {
    domNode;
    constructor(x, y, elementOrSelector, ...children) {
        super(x, y);
        this.domNode = new DomNode(elementOrSelector, ...children).style({
            position: "absolute",
            left: "-9999999px",
            top: "-9999999px",
            outline: GaiaEngineConfig.isDevMode ? "1px solid red" : undefined,
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
    previousTransform = {
        left: Number.NEGATIVE_INFINITY,
        top: Number.NEGATIVE_INFINITY,
        scaleX: 1,
        scaleY: 1,
    };
    resetPreviousTransform() {
        this.previousTransform = {
            left: Number.NEGATIVE_INFINITY,
            top: Number.NEGATIVE_INFINITY,
            scaleX: 1,
            scaleY: 1,
        };
    }
    update(deltaTime) {
        super.update(deltaTime);
        if (this.screen) {
            const calculatedLeft = (this.absoluteTransform.x -
                this.screen.camera.getX() + this.screen.width / 2) *
                this.screen.ratio;
            const calculatedTop = (this.absoluteTransform.y -
                this.screen.camera.getY() + this.screen.height / 2) *
                this.screen.ratio;
            const calculatedScaleX = this.absoluteTransform.scaleX *
                this.screen.ratio;
            const calculatedScaleY = this.absoluteTransform.scaleY *
                this.screen.ratio;
            const hasTransformChanged = this.previousTransform.left !== calculatedLeft ||
                this.previousTransform.top !== calculatedTop ||
                this.previousTransform.scaleX !== calculatedScaleX ||
                this.previousTransform.scaleY !== calculatedScaleY;
            if (hasTransformChanged) {
                this.previousTransform.left = calculatedLeft;
                this.previousTransform.top = calculatedTop;
                this.previousTransform.scaleX = calculatedScaleX;
                this.previousTransform.scaleY = calculatedScaleY;
                this.domNode.style({
                    transform: `scale(${calculatedScaleX}, ${calculatedScaleY}) rotate(${this.absoluteTransform.rotation}rad)`,
                });
                const rect = this.domNode.calculateRect();
                this.domNode.style({
                    left: `${calculatedLeft - rect.width / 2 / calculatedScaleX}px`,
                    top: `${calculatedTop - rect.height / 2 / calculatedScaleY}px`,
                });
            }
        }
    }
    remove() {
        this.domNode.remove();
        super.remove();
    }
}
//# sourceMappingURL=DomWrapperNode.js.map