import { EventHandlers } from "@commonmodule/ts";
import { FillInput, StrokeInput } from "pixi.js";
import ShapeNode from "./ShapeNode.js";
export default class CircleNode<E extends EventHandlers = {}> extends ShapeNode<E> {
    private _radius;
    private fill;
    private _stroke?;
    constructor(x: number, y: number, _radius: number, fill: FillInput | undefined, _stroke?: StrokeInput | undefined);
    protected draw(): void;
    stroke(stroke: StrokeInput): void;
}
//# sourceMappingURL=CircleNode.d.ts.map