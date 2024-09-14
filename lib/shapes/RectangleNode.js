import ShapeNode from "./ShapeNode.js";
export default class RectangleNode extends ShapeNode {
    constructor(x, y, width, height, color, stroke) {
        super(x, y);
        this.container.rect(0, 0, width, height);
        if (color)
            this.container.fill(color);
        this.container.stroke(stroke);
    }
}
//# sourceMappingURL=RectangleNode.js.map