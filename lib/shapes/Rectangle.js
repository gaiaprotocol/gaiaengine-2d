import Shape from "./ShapeNode.ts";
export default class Rectangle extends Shape {
    constructor(x, y, width, height, color) {
        super(x, y);
        this.container.rect(0, 0, width, height).fill(color);
    }
}
//# sourceMappingURL=Rectangle.js.map