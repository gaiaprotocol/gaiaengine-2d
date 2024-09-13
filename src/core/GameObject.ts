import { Container } from "pixi.js";
import TransformableNode from "./TransformableNode.js";

export default class GameObject extends TransformableNode {
  protected container: Container;

  constructor(x: number, y: number) {
    super();
    this.container = new Container({ x, y });
  }

  public appendTo(parent: GameObject, index?: number): this {
    index !== undefined
      ? parent.container.addChildAt(this.container, index)
      : parent.container.addChild(this.container);
    return super.appendTo(parent, index);
  }
}
