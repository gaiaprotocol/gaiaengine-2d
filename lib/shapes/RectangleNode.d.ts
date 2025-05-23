import { EventHandlers } from "@commonmodule/ts";
import { FillInput, StrokeInput } from "pixi.js";
import ShapeNode from "./ShapeNode.js";
export default class RectangleNode<E extends EventHandlers = {}> extends ShapeNode<E> {
    private _width;
    private _height;
    private fill;
    private _stroke?;
    constructor(x: number, y: number, _width: number, _height: number, fill: FillInput | undefined, _stroke?: StrokeInput | undefined);
    protected draw(): void;
    set width(width: number);
    get width(): number;
    set height(height: number);
    get height(): number;
    stroke(stroke: StrokeInput): void;
}
//# sourceMappingURL=RectangleNode.d.ts.map