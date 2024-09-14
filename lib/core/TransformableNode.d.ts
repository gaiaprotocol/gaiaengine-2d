import GameNode from "./GameNode.js";
import Transform from "./Transform.js";
export default abstract class TransformableNode extends GameNode {
    constructor(x: number, y: number);
    protected transform: Transform;
    absoluteTransform: Transform;
    protected update(deltaTime: number): void;
}
//# sourceMappingURL=TransformableNode.d.ts.map