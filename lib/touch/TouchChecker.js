import { TreeNode } from "@common-module/app";
import ColliderType from "../collision/ColliderType.js";
import CollisionUtil from "../collision/CollisionUtil.js";
import TouchEventType from "./TouchEventType.js";
export default class TouchChecker extends TreeNode {
    collider;
    eventHandler;
    _screen;
    domEventNames = [];
    constructor(eventType, collider, eventHandler) {
        super();
        this.collider = collider;
        this.eventHandler = eventHandler;
        if (eventType === TouchEventType.TouchStart) {
            this.domEventNames.push("touchstart", "mousedown");
        }
        else if (eventType === TouchEventType.TouchMove) {
            this.domEventNames.push("touchmove", "mousemove");
        }
        else if (eventType === TouchEventType.TouchEnd) {
            this.domEventNames.push("touchend", "mouseup");
        }
    }
    domEventHandler = (e) => {
        if (this._screen && this.parent) {
            const screenRect = this._screen.rect;
            const cx = e instanceof TouchEvent ? e.touches[0].clientX : e.clientX;
            const cy = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
            const rx = (cx - screenRect.x - this._screen.width / 2 + this._screen.camera.x) /
                this.parent.worldTransform.scaleX - this.parent.worldTransform.x;
            const ry = (cy - screenRect.y - this._screen.height / 2 + this._screen.camera.y) /
                this.parent.worldTransform.scaleY - this.parent.worldTransform.y;
            if (this.collider.type === ColliderType.Rect &&
                CollisionUtil.checkPointInRect(rx, ry, this.collider.x, this.collider.y, this.collider.width, this.collider.height, Math.sin(this.parent.worldTransform.rotation), Math.cos(this.parent.worldTransform.rotation))) {
                e.preventDefault();
                this.eventHandler(rx, ry, cx, cy);
            }
        }
    };
    set screen(screen) {
        if (this._screen) {
            for (const domEventName of this.domEventNames) {
                this._screen.offDom(domEventName, this.domEventHandler);
            }
        }
        this._screen = screen;
        if (this._screen) {
            for (const domEventName of this.domEventNames) {
                this._screen.onDom(domEventName, this.domEventHandler);
            }
        }
    }
    get screen() {
        return this._screen;
    }
    appendTo(node, index) {
        this.screen = node.screen;
        return super.appendTo(node, index);
    }
    delete() {
        if (this._screen) {
            for (const domEventName of this.domEventNames) {
                this._screen.offDom(domEventName, this.domEventHandler);
            }
        }
        super.delete();
    }
    _tick(deltaTime) { }
}
//# sourceMappingURL=TouchChecker.js.map