import GameNode from "./GameNode.js";

interface Transform {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
}

export default abstract class TransformableNode extends GameNode {
  protected x: number = 0;
  protected y: number = 0;
  private scaleX: number = 1;
  private scaleY: number = 1;
  private rotation: number = 0;

  protected absoluteTransform: Transform = {
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    rotation: 0,
  };

  protected update(deltaTime: number) {
    const parent = this.parent as TransformableNode | undefined;
    const parentTransform = parent?.absoluteTransform;

    if (parentTransform) {
      this.absoluteTransform.x = this.x + parentTransform.x;
      this.absoluteTransform.y = this.y + parentTransform.y;
      this.absoluteTransform.scaleX = this.scaleX * parentTransform.scaleX;
      this.absoluteTransform.scaleY = this.scaleY * parentTransform.scaleY;
      this.absoluteTransform.rotation = this.rotation +
        parentTransform.rotation;
    }

    super.update(deltaTime);
  }
}
