import { Graphics } from "pixi.js";
import DisplayNode from "../core/DisplayNode.js";
export default abstract class ShapeNode extends DisplayNode<Graphics> {
    constructor(x: number, y: number);
    protected abstract draw(): void;
}
//# sourceMappingURL=ShapeNode.d.ts.map