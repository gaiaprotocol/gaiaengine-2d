import { EventHandlers } from "@commonmodule/ts";
import { Graphics, StrokeInput } from "pixi.js";
import DisplayNode from "../core/DisplayNode.js";

export default abstract class ShapeNode<E extends EventHandlers = {}>
  extends DisplayNode<Graphics, E> {
  constructor(x: number, y: number) {
    super(new Graphics({ x, y }));
  }

  protected abstract draw(): void;
  public abstract stroke(stroke: StrokeInput): void;
}
