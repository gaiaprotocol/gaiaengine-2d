import { EventRecord } from "@commonmodule/ts";
import { FillInput, StrokeInput } from "pixi.js";
import ShapeNode from "./ShapeNode.js";

export default class EllipseNode<E extends EventRecord = EventRecord>
  extends ShapeNode<E> {
  constructor(
    x: number,
    y: number,
    private width: number,
    private height: number,
    private fill: FillInput | undefined,
    private _stroke?: StrokeInput,
  ) {
    super(x, y);
    this.draw();
  }

  protected draw(): void {
    this.container.clear().ellipse(0, 0, this.width / 2, this.height / 2);
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
