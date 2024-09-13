import GameNode from "./GameNode.js";
interface Transform {
    x: number;
    y: number;
    scaleX: number;
    scaleY: number;
    rotation: number;
}
export default abstract class TransformableNode extends GameNode {
    constructor(x: number, y: number);
    protected transform: Transform;
    protected absoluteTransform: Transform;
    protected update(deltaTime: number): void;
}
export {};
//# sourceMappingURL=TransformableNode.d.ts.map