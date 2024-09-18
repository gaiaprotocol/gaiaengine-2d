import { ColorSource, StrokeInput } from "pixi.js";
import ShapeNode from "./ShapeNode.js";

export default class EllipseNode extends ShapeNode {
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: ColorSource | undefined,
    stroke?: StrokeInput,
  ) {
    super(x, y);
    this.container.ellipse(0, 0, width / 2, height / 2);
    if (color) this.container.fill(color);
    this.container.stroke(stroke);
  }
}
