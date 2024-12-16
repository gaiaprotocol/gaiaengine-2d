import GameNode from "./GameNode.js";
import Transform from "./Transform.js";

export default abstract class TransformableNode extends GameNode {
  constructor(x: number, y: number) {
    super();
    this.transform.x = x;
    this.transform.y = y;
  }

  protected transform: Transform = {
    x: Number.NEGATIVE_INFINITY,
    y: Number.NEGATIVE_INFINITY,
    pivotX: 0,
    pivotY: 0,
    scaleX: 1,
    scaleY: 1,
    rotation: 0,
    alpha: 1,
  };

  public absoluteTransform: Transform = {
    x: Number.NEGATIVE_INFINITY,
    y: Number.NEGATIVE_INFINITY,
    pivotX: 0,
    pivotY: 0,
    scaleX: 1,
    scaleY: 1,
    rotation: 0,
    alpha: 1,
  };

  protected update(deltaTime: number): void {
    const parent = this.parent as TransformableNode | undefined;
    const parentTransform = parent?.absoluteTransform;

    if (parentTransform) {
      this.absoluteTransform.x = this.transform.x -
        (this.transform.pivotX * this.transform.scaleX *
            Math.cos(this.transform.rotation) -
          this.transform.pivotY * this.transform.scaleY *
            Math.sin(this.transform.rotation)) +
        parentTransform.x;
      this.absoluteTransform.y = this.transform.y -
        (this.transform.pivotX * this.transform.scaleX *
            Math.sin(this.transform.rotation) +
          this.transform.pivotY * this.transform.scaleY *
            Math.cos(this.transform.rotation)) +
        parentTransform.y;
      this.absoluteTransform.scaleX = this.transform.scaleX *
        parentTransform.scaleX;
      this.absoluteTransform.scaleY = this.transform.scaleY *
        parentTransform.scaleY;
      this.absoluteTransform.rotation = this.transform.rotation +
        parentTransform.rotation;
      this.absoluteTransform.alpha = this.transform.alpha *
        parentTransform.alpha;
    }

    super.update(deltaTime);
  }
}
