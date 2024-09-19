import { Container } from "pixi.js";
import GameNode from "./GameNode.js";
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

  public set scale(scale: number) {
    this.container.scale = scale;
  }

  public get scale() {
    return this.container.scale.x;
  }

  public appendTo(parent: GameNode, index?: number): this {
    index !== undefined
      ? (parent as DisplayNode).container.addChildAt(this.container, index)
      : (parent as DisplayNode).container.addChild(this.container);
    return super.appendTo(parent, index);
  }

  public remove(): void {
    this.container.destroy();
    super.remove();
  }

  public hide(): void {
    this.container.visible = false;
  }

  public show(): void {
    this.container.visible = true;
  }
}
