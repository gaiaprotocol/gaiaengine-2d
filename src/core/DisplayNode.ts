import { Container } from "pixi.js";
import TransformableNode from "./TransformableNode.js";

export default class DisplayNode<CT extends Container = Container>
  extends TransformableNode {
  constructor(protected container: CT) {
    super(container.x, container.y);
  }

  public set x(x: number) {
    this.transform.x = x;
    this.container.x = x;
  }

  public get x() {
    return this.container.x;
  }

  public set y(y: number) {
    this.transform.y = y;
    this.container.y = y;
  }

  public get y() {
    return this.container.y;
  }

  public setPosition(x: number, y: number): this {
    this.x = x;
    this.y = y;
    return this;
  }

  public appendTo(parent: DisplayNode, index?: number): this {
    index !== undefined
      ? parent.container.addChildAt(this.container, index)
      : parent.container.addChild(this.container);
    return super.appendTo(parent, index);
  }
}
