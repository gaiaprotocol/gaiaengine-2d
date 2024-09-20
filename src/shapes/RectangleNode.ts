import { ColorSource, StrokeInput } from "pixi.js";
import ShapeNode from "./ShapeNode.js";

export default class RectangleNode extends ShapeNode {
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: ColorSource | undefined,
    stroke?: StrokeInput,
  ) {
    super(x, y);
    this.container.rect(-width / 2, -height / 2, width, height);
    if (color) this.container.fill(color);
    this.container.stroke(stroke);
  }
}
