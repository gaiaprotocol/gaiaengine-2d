import { Container } from "pixi.js";
import Entity from "./Entity.js";
export default class Node extends Entity {
    _screen;
    container;
    constructor(x, y) {
        super();
        this.container = new Container({ x, y });
    }
    setPosition(x, y) {
        this.container.position.set(x, y);
    }
    set x(x) {
        this.container.x = x;
    }
    get x() {
        return this.container.x;
    }
    set y(y) {
        this.container.y = y;
    }
    get y() {
        return this.container.y;
    }
    set scaleX(scaleX) {
        this.container.scale.x = scaleX;
    }
    get scaleX() {
        return this.container.scale.x;
    }
    hide() {
        this.container.visible = false;
    }
    show() {
        this.container.visible = true;
    }
    set screen(screen) {
        this._screen = screen;
        for (const child of this.children) {
            child.screen = screen;
        }
    }
    get screen() {
        return this._screen;
    }
    appendTo(node, index) {
        if (index !== undefined && index < node.children.length) {
            node.container.addChildAt(this.container, index);
        }
        else {
            node.container.addChild(this.container);
        }
        this.screen = node.screen;
        return super.appendTo(node, index);
    }
    delete() {
        this.container.destroy();
        super.delete();
        this.container = undefined;
    }
}
//# sourceMappingURL=Node.js.map