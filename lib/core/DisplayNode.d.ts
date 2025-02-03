import { BLEND_MODES, ColorSource, Container } from "pixi.js";
import GameNode from "./GameNode.js";
import TransformableNode from "./TransformableNode.js";
export default class DisplayNode<CT extends Container = Container> extends TransformableNode {
    protected container: CT;
    private _useYForDrawingOrder;
    constructor(container: CT);
    set x(x: number);
    get x(): number;
    set y(y: number);
    get y(): number;
    setPosition(x: number, y: number): this;
    set drawingOrder(drawingOrder: number);
    get drawingOrder(): number;
    enableYBasedDrawingOrder(): void;
    disableYBasedDrawingOrder(): void;
    private updateDrawingOrder;
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
    set blendMode(blendMode: BLEND_MODES);
    get blendMode(): BLEND_MODES;
    set tint(tint: ColorSource);
    get tint(): ColorSource;
    hide(): void;
    show(): void;
    appendTo(parent: GameNode, index?: number): this;
    remove(): void;
}
//# sourceMappingURL=DisplayNode.d.ts.map