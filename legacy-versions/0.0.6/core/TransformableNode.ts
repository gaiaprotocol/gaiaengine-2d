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
    scaleX: 1,
    scaleY: 1,
    rotation: 0,
  };

  public absoluteTransform: Transform = {
    x: Number.NEGATIVE_INFINITY,
    y: Number.NEGATIVE_INFINITY,
    scaleX: 1,
    scaleY: 1,
    rotation: 0,
  };

  protected update(deltaTime: number): void {
    const parent = this.parent as TransformableNode | undefined;
    const parentTransform = parent?.absoluteTransform;

    if (parentTransform) {
      this.absoluteTransform.x = this.transform.x + parentTransform.x;
      this.absoluteTransform.y = this.transform.y + parentTransform.y;
      this.absoluteTransform.scaleX = this.transform.scaleX *
        parentTransform.scaleX;
      this.absoluteTransform.scaleY = this.transform.scaleY *
        parentTransform.scaleY;
      this.absoluteTransform.rotation = this.transform.rotation +
        parentTransform.rotation;
    }

    super.update(deltaTime);
  }
}
