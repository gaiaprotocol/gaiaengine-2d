import TransformableNode from "./TransformableNode.js";
export default class DisplayNode extends TransformableNode {
    container;
    constructor(container) {
        super(container.x, container.y);
        this.container = container;
    }
    set x(x) {
        this.transform.x = x;
        this.container.x = x;
    }
    get x() {
        return this.container.x;
    }
    set y(y) {
        this.transform.y = y;
        this.container.y = y;
    }
    get y() {
        return this.container.y;
    }
    setPosition(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    appendTo(parent, index) {
        index !== undefined
            ? parent.container.addChildAt(this.container, index)
            : parent.container.addChild(this.container);
        return super.appendTo(parent, index);
    }
    remove() {
        this.container.destroy();
        super.remove();
    }
    hide() {
        this.container.visible = false;
    }
    show() {
        this.container.visible = true;
    }
}
//# sourceMappingURL=DisplayNode.js.map