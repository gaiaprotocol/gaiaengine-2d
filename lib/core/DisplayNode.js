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
    set zIndex(zIndex) {
        this.container.zIndex = zIndex;
    }
    get zIndex() {
        return this.container.zIndex;
    }
    setPivot(x, y) {
        this.container.pivot.set(x, y);
        return this;
    }
    set scaleX(scaleX) {
        this.transform.scaleX = scaleX;
        this.container.scale.x = scaleX;
    }
    get scaleX() {
        return this.container.scale.x;
    }
    set scaleY(scaleY) {
        this.transform.scaleY = scaleY;
        this.container.scale.y = scaleY;
    }
    get scaleY() {
        return this.container.scale.y;
    }
    set scale(scale) {
        this.transform.scaleX = scale;
        this.transform.scaleY = scale;
        this.container.scale = scale;
    }
    get scale() {
        return this.container.scale.x;
    }
    set alpha(alpha) {
        this.transform.alpha = alpha;
        this.container.alpha = alpha;
    }
    get alpha() {
        return this.container.alpha;
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