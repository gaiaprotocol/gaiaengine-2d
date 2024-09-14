import ShapeNode from "./ShapeNode.js";
export default class EllipseNode extends ShapeNode {
    constructor(x, y, width, height, color, stroke) {
        super(x, y);
        this.container.ellipse(0, 0, width / 2, height / 2);
        if (color)
            this.container.fill(color);
        this.container.stroke(stroke);
    }
}
//# sourceMappingURL=EllipseNode.js.map