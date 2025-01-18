import { BLEND_MODES, Container } from "pixi.js";
import GameNode from "./GameNode.js";
import TransformableNode from "./TransformableNode.js";

export default class DisplayNode<CT extends Container = Container>
  extends TransformableNode {
  private _useYForDrawingOrder: boolean = false;

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
    if (this._useYForDrawingOrder) {
      this.updateDrawingOrder();
    }
  }

  public get y() {
    return this.container.y;
  }

  public setPosition(x: number, y: number): this {
    this.x = x;
    this.y = y;
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
    this.transform.pivotX = x;
    this.transform.pivotY = y;
    this.container.pivot.set(x, y);
    return this;
  }

  public set scaleX(scaleX: number) {
    this.transform.scaleX = scaleX;
    this.container.scale.x = scaleX;
  }

  public get scaleX() {
    return this.container.scale.x;
  }

  public set scaleY(scaleY: number) {
    this.transform.scaleY = scaleY;
    this.container.scale.y = scaleY;
  }

  public get scaleY() {
    return this.container.scale.y;
  }

  public set scale(scale: number) {
    this.transform.scaleX = scale;
    this.transform.scaleY = scale;
    this.container.scale = scale;
  }

  public get scale() {
    return this.container.scale.x;
  }

  public set alpha(alpha: number) {
    this.transform.alpha = alpha;
    this.container.alpha = alpha;
  }

  public get alpha() {
    return this.container.alpha;
  }

  public set rotation(rotation: number) {
    this.transform.rotation = rotation;
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
