import TransformableNode from "./TransformableNode.js";
export default class DisplayNode extends TransformableNode {
    container;
    _useYForDrawingOrder = false;
    constructor(container) {
        super(container.x, container.y);
        this.container = container;
    }
    set x(x) {
        super.x = x;
        this.container.x = x;
    }
    get x() {
        return this.container.x;
    }
    set y(y) {
        super.y = y;
        this.container.y = y;
        if (this._useYForDrawingOrder) {
            this.updateDrawingOrder();
        }
    }
    get y() {
        return this.container.y;
    }
    setPosition(x, y) {
        super.setPosition(x, y);
        this.container.position.set(x, y);
        return this;
    }
    set drawingOrder(drawingOrder) {
        this.container.zIndex = drawingOrder;
    }
    get drawingOrder() {
        return this.container.zIndex;
    }
    enableYBasedDrawingOrder() {
        this._useYForDrawingOrder = true;
        this.updateDrawingOrder();
    }
    disableYBasedDrawingOrder() {
        this._useYForDrawingOrder = false;
    }
    updateDrawingOrder() {
        this.drawingOrder = this.y;
    }
    setPivot(x, y) {
        super.setPivot(x, y);
        this.container.pivot.set(x, y);
        return this;
    }
    set scaleX(scaleX) {
        super.scaleX = scaleX;
        this.container.scale.x = scaleX;
    }
    get scaleX() {
        return this.container.scale.x;
    }
    set scaleY(scaleY) {
        super.scaleY = scaleY;
        this.container.scale.y = scaleY;
    }
    get scaleY() {
        return this.container.scale.y;
    }
    set scale(scale) {
        super.scale = scale;
        this.container.scale = scale;
    }
    get scale() {
        return this.container.scale.x;
    }
    set alpha(alpha) {
        super.alpha = alpha;
        this.container.alpha = alpha;
    }
    get alpha() {
        return this.container.alpha;
    }
    set rotation(rotation) {
        super.rotation = rotation;
        this.container.rotation = rotation;
    }
    get rotation() {
        return this.container.rotation;
    }
    set blendMode(blendMode) {
        this.container.blendMode = blendMode;
    }
    get blendMode() {
        return this.container.blendMode;
    }
    set tint(tint) {
        this.container.tint = tint;
    }
    get tint() {
        return this.container.tint;
    }
    hide() {
        this.container.visible = false;
    }
    show() {
        this.container.visible = true;
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
}
//# sourceMappingURL=DisplayNode.js.map