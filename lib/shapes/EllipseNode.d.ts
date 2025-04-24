import { EventRecord } from "@commonmodule/ts";
import { FillInput, StrokeInput } from "pixi.js";
import ShapeNode from "./ShapeNode.js";
export default class EllipseNode<E extends EventRecord = EventRecord> extends ShapeNode<E> {
    private width;
    private height;
    private fill;
    private _stroke?;
    constructor(x: number, y: number, width: number, height: number, fill: FillInput | undefined, _stroke?: StrokeInput | undefined);
    protected draw(): void;
    set stroke(stroke: StrokeInput | undefined);
    get stroke(): StrokeInput | undefined;
}
//# sourceMappingURL=EllipseNode.d.ts.map