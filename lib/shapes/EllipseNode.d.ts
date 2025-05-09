import { EventHandlers } from "@commonmodule/ts";
import { FillInput, StrokeInput } from "pixi.js";
import ShapeNode from "./ShapeNode.js";
export default class EllipseNode<E extends EventHandlers = {}> extends ShapeNode<E> {
    private width;
    private height;
    private fill;
    private _stroke?;
    constructor(x: number, y: number, width: number, height: number, fill: FillInput | undefined, _stroke?: StrokeInput | undefined);
    protected draw(): void;
    stroke(stroke: StrokeInput): void;
}
//# sourceMappingURL=EllipseNode.d.ts.map