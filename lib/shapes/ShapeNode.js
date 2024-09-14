import { Graphics } from "pixi.js";
import DisplayNode from "../core/DisplayNode.js";
export default class ShapeNode extends DisplayNode {
    constructor(x, y) {
        super(new Graphics({ x, y }));
    }
}
//# sourceMappingURL=ShapeNode.js.map