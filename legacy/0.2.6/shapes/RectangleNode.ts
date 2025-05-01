import { EventRecord } from "@commonmodule/ts";
import { FillInput, StrokeInput } from "pixi.js";
import ShapeNode from "./ShapeNode.js";

export default class RectangleNode<E extends EventRecord = {}>
  extends ShapeNode<E> {
  constructor(
    x: number,
    y: number,
    private _width: number,
    private _height: number,
    private fill: FillInput | undefined,
    private _stroke?: StrokeInput,
  ) {
    super(x, y);
    this.draw();
  }

  protected draw(): void {
    this.container.clear().rect(
      -this._width / 2,
      -this._height / 2,
      this._width,
      this._height,
    );
    if (this.fill) this.container.fill(this.fill);
    if (this._stroke) this.container.stroke(this._stroke);
  }

  public set width(width: number) {
    this._width = width;
    this.draw();
  }

  public get width() {
    return this._width;
  }

  public set height(height: number) {
    this._height = height;
    this.draw();
  }

  public get height() {
    return this._height;
  }

  public stroke(stroke: StrokeInput): void {
    this.container.stroke(stroke);
  }
}
