import { BLEND_MODES, ColorSource, Container } from "pixi.js";
import GameNode from "./GameNode.js";
import TransformableNode from "./TransformableNode.js";

export default class DisplayNode<
  CT extends Container = Container,
  E extends Record<string, (...args: any[]) => any> = {},
> extends TransformableNode<E> {
  private _useYForDrawingOrder: boolean = false;

  constructor(protected container: CT) {
    super(container.x, container.y);
  }

  public set x(x: number) {
    super.x = x;
    this.container.x = x;
  }

  public get x() {
    return this.container.x;
  }

  public set y(y: number) {
    super.y = y;
    this.container.y = y;
    if (this._useYForDrawingOrder) {
      this.updateDrawingOrder();
    }
  }

  public get y() {
    return this.container.y;
  }

  public setPosition(x: number, y: number): this {
    super.setPosition(x, y);
    this.container.position.set(x, y);
    return this;
  }

  public set drawingOrder(drawingOrder: number) {
    this.container.zIndex = drawingOrder;
  }

  public get drawingOrder() {
    return this.container.zIndex;
  }

  public enableYBasedDrawingOrder() {
    this._useYForDrawingOrder = true;
    this.updateDrawingOrder();
  }

  public disableYBasedDrawingOrder() {
    this._useYForDrawingOrder = false;
  }

  private updateDrawingOrder() {
    this.drawingOrder = this.y;
  }

  public setPivot(x: number, y: number): this {
    super.setPivot(x, y);
    this.container.pivot.set(x, y);
    return this;
  }

  public set scaleX(scaleX: number) {
    super.scaleX = scaleX;
    this.container.scale.x = scaleX;
  }

  public get scaleX() {
    return this.container.scale.x;
  }

  public set scaleY(scaleY: number) {
    super.scaleY = scaleY;
    this.container.scale.y = scaleY;
  }

  public get scaleY() {
    return this.container.scale.y;
  }

  public set scale(scale: number) {
    super.scale = scale;
    this.container.scale = scale;
  }

  public get scale() {
    return this.container.scale.x;
  }

  public set alpha(alpha: number) {
    super.alpha = alpha;
    this.container.alpha = alpha;
  }

  public get alpha() {
    return this.container.alpha;
  }

  public set rotation(rotation: number) {
    super.rotation = rotation;
    this.container.rotation = rotation;
  }

  public get rotation() {
    return this.container.rotation;
  }

  public set blendMode(blendMode: BLEND_MODES) {
    this.container.blendMode = blendMode;
  }

  public get blendMode() {
    return this.container.blendMode;
  }

  public set tint(tint: ColorSource) {
    this.container.tint = tint;
  }

  public get tint() {
    return this.container.tint;
  }

  public hide(): void {
    this.container.visible = false;
  }

  public show(): void {
    this.container.visible = true;
  }

  public appendTo(parent: GameNode, index?: number): this {
    index !== undefined
      ? (parent as DisplayNode).container.addChildAt(this.container, index)
      : (parent as DisplayNode).container.addChild(this.container);
    return super.appendTo(parent, index);
  }

  public remove(): void {
    this.container.destroy({ children: true });
    super.remove();
  }
}
