import { TreeNode } from "@common-module/app";
import { Container } from "pixi.js";
export default class GameNode extends TreeNode {
    container;
    _screen;
    constructor(x, y, container) {
        super();
        this.container = container ?? new Container({ x, y });
        if (container)
            this.setPosition(x, y);
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
    step(deltaTime) {
        for (const child of this.children) {
            child.step(deltaTime);
        }
    }
    setPosition(x, y) {
        this.container.position.set(x, y);
    }
    hide() {
        this.container.visible = false;
    }
    show() {
        this.container.visible = true;
    }
    delete() {
        this.container.destroy();
        super.delete();
    }
}
//# sourceMappingURL=GameNode.js.map