import { TreeNode } from "@common-module/app";
import { Container } from "pixi.js";
export default class GameNode extends TreeNode {
    container;
    _screen;
    children = [];
    constructor(container) {
        super();
        this.container = container ?? new Container();
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
}
//# sourceMappingURL=GameNode.js.map