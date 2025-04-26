import ShapeNode from "./ShapeNode.js";
export default class RectangleNode extends ShapeNode {
    _width;
    _height;
    fill;
    _stroke;
    constructor(x, y, _width, _height, fill, _stroke) {
        super(x, y);
        this._width = _width;
        this._height = _height;
        this.fill = fill;
        this._stroke = _stroke;
        this.draw();
    }
    draw() {
        this.container.clear().rect(-this._width / 2, -this._height / 2, this._width, this._height);
        if (this.fill)
            this.container.fill(this.fill);
        if (this._stroke)
            this.container.stroke(this._stroke);
    }
    set width(width) {
        this._width = width;
        this.draw();
    }
    get width() {
        return this._width;
    }
    set height(height) {
        this._height = height;
        this.draw();
    }
    get height() {
        return this._height;
    }
    stroke(stroke) {
        this.container.stroke(stroke);
    }
}
//# sourceMappingURL=RectangleNode.js.map