import ColliderType from "../collision/colliders/ColliderType.js";
import GameObject from "../core/GameObject.js";
import CircleNode from "../shapes/CircleNode.js";
import ShapeNode from "../shapes/ShapeNode.js";

export default class DebugColliderDrawNode extends GameObject {
  declare public parent: GameObject | undefined;

  private parentScale: number = 1;

  constructor(private strokeColor: string) {
    super(0, 0);
  }

  public appendTo(parent: GameObject, index?: number): this {
    if ((parent as any).colliders !== undefined) {
      this.parentScale = parent.scale;

      for (const collider of (parent as any).colliders) {
        if (collider.type === ColliderType.Circle) {
          this.append(
            new CircleNode(
              collider.x,
              collider.y,
              collider.radius,
              undefined,
              { color: this.strokeColor, width: 1 / this.parentScale },
            ),
          );
        }
      }
    }
    return super.appendTo(parent, index);
  }

  protected update(deltaTime: number) {
    super.update(deltaTime);

    if (
      this.parent &&
      this.parent.scale !== this.parentScale
    ) {
      this.parentScale = this.parent.scale;
      for (const child of this.children) {
        if (child instanceof ShapeNode) {
          child.stroke({
            color: this.strokeColor,
            width: 1 / this.parentScale,
          });
        }
      }
    }
  }
}
