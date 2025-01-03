import { FillInput, StrokeInput } from "pixi.js";
import ShapeNode from "./ShapeNode.js";

export default class RectangleNode extends ShapeNode {
  constructor(
    x: number,
    y: number,
    private width: number,
    private height: number,
    private fill: FillInput | undefined,
    private _stroke?: StrokeInput,
  ) {
    super(x, y);
  }

  protected draw(): void {
    this.container.clear().rect(
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height,
    );
    if (this.fill) this.container.fill(this.fill);
    this.container.stroke(this._stroke);
  }

  public set stroke(stroke: StrokeInput | undefined) {
    this._stroke = stroke;
    this.draw();
  }

  public get stroke() {
    return this._stroke;
  }
}
