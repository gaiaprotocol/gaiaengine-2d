import { FillInput, StrokeInput } from "pixi.js";
import ShapeNode from "./ShapeNode.js";
export default class CircleNode extends ShapeNode {
    private _radius;
    private fill;
    private _stroke?;
    constructor(x: number, y: number, _radius: number, fill: FillInput | undefined, _stroke?: StrokeInput | undefined);
    protected draw(): void;
    set stroke(stroke: StrokeInput | undefined);
    get stroke(): StrokeInput | undefined;
}
//# sourceMappingURL=CircleNode.d.ts.map