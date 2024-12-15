import { Graphics } from "pixi.js";
import DisplayNode from "../core/DisplayNode.js";

export default abstract class ShapeNode extends DisplayNode<Graphics> {
  constructor(x: number, y: number) {
    super(new Graphics({ x, y }));
    this.draw();
  }

  protected abstract draw(): void;
}
