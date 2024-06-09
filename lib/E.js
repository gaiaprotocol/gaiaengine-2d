import { TreeNode } from "@common-module/app";
export default class Node extends TreeNode {
    x;
    y;
    visible = true;
    _screen;
    _container;
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
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
    set container(container) {
        if (!this.deleted && container) {
            container.position.set(this.x, this.y);
            if (!this.visible)
                container.visible = this.visible;
        }
        this._container = container;
    }
    get container() {
        return this._container;
    }
    appendTo(node, index) {
        if (this.container) {
            if (index !== undefined && index < node.children.length) {
                node.container?.addChildAt(this.container, index);
            }
            else {
                node.container?.addChild(this.container);
            }
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
        this.x = x;
        this.y = y;
        this.container?.position.set(x, y);
    }
    hide() {
        this.visible = false;
        if (this.container)
            this.container.visible = false;
    }
    show() {
        this.visible = true;
        if (this.container)
            this.container.visible = true;
    }
    delete() {
        this.container?.destroy();
        super.delete();
    }
}
//# sourceMappingURL=E.js.map