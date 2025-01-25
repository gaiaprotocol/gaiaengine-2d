import { FillInput, StrokeInput } from "pixi.js";
import ShapeNode from "./ShapeNode.js";

export default class CircleNode extends ShapeNode {
  constructor(
    x: number,
    y: number,
    private _radius: number,
    private fill: FillInput | undefined,
    private _stroke?: StrokeInput,
  ) {
    super(x, y);
    this.draw();
  }

  protected draw(): void {
    this.container.clear().circle(0, 0, this._radius);
    if (this.fill) this.container.fill(this.fill);
    if (this._stroke) this.container.stroke(this._stroke);
  }

  public set stroke(stroke: StrokeInput | undefined) {
    this._stroke = stroke;
    this.draw();
  }

  public get stroke() {
    return this._stroke;
  }
}
