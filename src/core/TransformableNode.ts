import GameNode from "./GameNode.js";

interface Transform {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
}

export default abstract class TransformableNode extends GameNode {
  constructor(x: number, y: number) {
    super();
    this.transform.x = x;
    this.transform.y = y;
  }

  protected transform: Transform = {
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    rotation: 0,
  };

  protected absoluteTransform: Transform = {
    x: 0,
    y: 0,
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
