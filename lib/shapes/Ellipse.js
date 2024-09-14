import ShapeNode from "./ShapeNode.ts";
export default class EllipseNode extends ShapeNode {
    constructor(x, y, width, height, color) {
        super(x, y);
        this.container.ellipse(0, 0, width, height).fill(color);
    }
}
//# sourceMappingURL=Ellipse.js.map