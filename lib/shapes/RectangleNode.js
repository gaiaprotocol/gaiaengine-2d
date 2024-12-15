import ShapeNode from "./ShapeNode.js";
export default class RectangleNode extends ShapeNode {
    width;
    height;
    fill;
    _stroke;
    constructor(x, y, width, height, fill, _stroke) {
        super(x, y);
        this.width = width;
        this.height = height;
        this.fill = fill;
        this._stroke = _stroke;
    }
    draw() {
        this.container.clear().rect(-this.width / 2, -this.height / 2, this.width, this.height);
        if (this.fill)
            this.container.fill(this.fill);
        this.container.stroke(this._stroke);
    }
    set stroke(stroke) {
        this._stroke = stroke;
        this.draw();
    }
    get stroke() {
        return this._stroke;
    }
}
//# sourceMappingURL=RectangleNode.js.map