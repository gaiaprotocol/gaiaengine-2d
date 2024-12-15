import { FillInput, StrokeInput } from "pixi.js";
import ShapeNode from "./ShapeNode.js";
export default class RectangleNode extends ShapeNode {
    private width;
    private height;
    private fill;
    private _stroke?;
    constructor(x: number, y: number, width: number, height: number, fill: FillInput | undefined, _stroke?: StrokeInput | undefined);
    protected draw(): void;
    set stroke(stroke: StrokeInput | undefined);
    get stroke(): StrokeInput | undefined;
}
//# sourceMappingURL=RectangleNode.d.ts.map