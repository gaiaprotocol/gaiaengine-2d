import ShapeNode from "./ShapeNode.js";
export default class EllipseNode extends ShapeNode {
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
        this.draw();
    }
    draw() {
        this.container.clear().ellipse(0, 0, this.width / 2, this.height / 2);
        if (this.fill)
            this.container.fill(this.fill);
        this.container.stroke(this._stroke);
    }
    stroke(stroke) {
        this.container.stroke(stroke);
    }
}
//# sourceMappingURL=EllipseNode.js.map