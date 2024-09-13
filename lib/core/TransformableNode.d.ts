import GameNode from "./GameNode.js";
interface Transform {
    x: number;
    y: number;
    scaleX: number;
    scaleY: number;
    rotation: number;
}
export default abstract class TransformableNode extends GameNode {
    protected x: number;
    protected y: number;
    private scaleX;
    private scaleY;
    private rotation;
    protected absoluteTransform: Transform;
    protected update(deltaTime: number): void;
}
export {};
//# sourceMappingURL=TransformableNode.d.ts.map