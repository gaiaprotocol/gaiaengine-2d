import { EventHandlers } from "@commonmodule/ts";
import GameNode from "./GameNode.js";
import Transform from "./Transform.js";

export default abstract class TransformableNode<E extends EventHandlers = {}>
  extends GameNode<E> {
  constructor(x: number, y: number) {
    super();
    this.transform.x = x;
    this.transform.y = y;
  }

  protected transform: Transform & { pivotX: number; pivotY: number } = {
    x: Number.NEGATIVE_INFINITY,
    y: Number.NEGATIVE_INFINITY,
    pivotX: 0,
    pivotY: 0,
    scaleX: 1,
    scaleY: 1,
    rotation: 0,
    alpha: 1,
  };

  public set x(x: number) {
    this.transform.x = x;
  }

  public get x() {
    return this.transform.x;
  }

  public set y(y: number) {
    this.transform.y = y;
  }

  public get y() {
    return this.transform.y;
  }

  public setPosition(x: number, y: number): this {
    this.transform.x = x;
    this.transform.y = y;
    return this;
  }

  public setPivot(x: number, y: number): this {
    this.transform.pivotX = x;
    this.transform.pivotY = y;
    return this;
  }

  public set scaleX(scaleX: number) {
    this.transform.scaleX = scaleX;
  }

  public get scaleX() {
    return this.transform.scaleX;
  }

  public set scaleY(scaleY: number) {
    this.transform.scaleY = scaleY;
  }

  public get scaleY() {
    return this.transform.scaleY;
  }

  public set scale(scale: number) {
    this.transform.scaleX = scale;
    this.transform.scaleY = scale;
  }

  public get scale() {
    return this.transform.scaleX;
  }

  public set alpha(alpha: number) {
    this.transform.alpha = alpha;
  }

  public get alpha() {
    return this.transform.alpha;
  }

  public set rotation(rotation: number) {
    this.transform.rotation = rotation;
  }

  public get rotation() {
    return this.transform.rotation;
  }

  public globalTransform: Transform = {
    x: Number.NEGATIVE_INFINITY,
    y: Number.NEGATIVE_INFINITY,
    scaleX: 1,
    scaleY: 1,
    rotation: 0,
    alpha: 1,
  };

  protected update(deltaTime: number): void {
    const parent = this.parent as TransformableNode | undefined;
    const pt = parent?.globalTransform;

    if (pt) {
      const rx = this.transform.x * pt.scaleX;
      const ry = this.transform.y * pt.scaleY;
      const pCos = Math.cos(pt.rotation);
      const pSin = Math.sin(pt.rotation);

      this.globalTransform.scaleX = pt.scaleX * this.transform.scaleX;
      this.globalTransform.scaleY = pt.scaleY * this.transform.scaleY;

      const pivotX = this.transform.pivotX * this.globalTransform.scaleX;
      const pivotY = this.transform.pivotY * this.globalTransform.scaleY;
      const cos = Math.cos(this.transform.rotation);
      const sin = Math.sin(this.transform.rotation);

      this.globalTransform.x = pt.x +
        (rx * pCos - ry * pSin) -
        (pivotX * cos - pivotY * sin);
      this.globalTransform.y = pt.y +
        (rx * pSin + ry * pCos) -
        (pivotX * sin + pivotY * cos);

      this.globalTransform.rotation = pt.rotation + this.transform.rotation;
      this.globalTransform.alpha = pt.alpha * this.transform.alpha;
    }

    super.update(deltaTime);
  }
}
