import { EventRecord } from "@commonmodule/ts";
import { Graphics } from "pixi.js";
import DisplayNode from "../core/DisplayNode.js";

export default abstract class ShapeNode<E extends EventRecord = {}>
  extends DisplayNode<Graphics, E> {
  constructor(x: number, y: number) {
    super(new Graphics({ x, y }));
  }

  protected abstract draw(): void;
}
