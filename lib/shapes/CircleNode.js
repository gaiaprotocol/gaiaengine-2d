import ShapeNode from "./ShapeNode.js";
export default class CircleNode extends ShapeNode {
    _radius;
    fill;
    _stroke;
    constructor(x, y, _radius, fill, _stroke) {
        super(x, y);
        this._radius = _radius;
        this.fill = fill;
        this._stroke = _stroke;
        this.draw();
    }
    draw() {
        this.container.clear().circle(0, 0, this._radius);
        if (this.fill)
            this.container.fill(this.fill);
        if (this._stroke)
            this.container.stroke(this._stroke);
    }
    stroke(stroke) {
        this.container.stroke(stroke);
    }
}
//# sourceMappingURL=CircleNode.js.map