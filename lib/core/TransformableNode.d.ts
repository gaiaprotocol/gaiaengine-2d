import GameNode from "./GameNode.js";
import Transform from "./Transform.js";
export default abstract class TransformableNode extends GameNode {
    constructor(x: number, y: number);
    private transform;
    set x(x: number);
    get x(): number;
    set y(y: number);
    get y(): number;
    setPosition(x: number, y: number): this;
    setPivot(x: number, y: number): this;
    set scaleX(scaleX: number);
    get scaleX(): number;
    set scaleY(scaleY: number);
    get scaleY(): number;
    set scale(scale: number);
    get scale(): number;
    set alpha(alpha: number);
    get alpha(): number;
    set rotation(rotation: number);
    get rotation(): number;
    globalTransform: Transform;
    protected update(deltaTime: number): void;
}
//# sourceMappingURL=TransformableNode.d.ts.map