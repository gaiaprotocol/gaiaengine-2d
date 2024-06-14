import Entity from "../base/Entity.js";
import Collidable from "./Collidable.js";
import CollisionUtil from "./CollisionUtil.js";

export default class CollisionChecker extends Entity {
  constructor(
    private target: Collidable,
    private others: Collidable[],
    private onCollision: (collided: Collidable) => void,
  ) {
    super();
  }

  private checkCollision(other: Collidable) {
    for (const targetCollider of this.target.colliders) {
      for (const otherCollider of other.colliders) {
        if (
          CollisionUtil.check(
            targetCollider,
            this.target.worldTransform,
            otherCollider,
            other.worldTransform,
          )
        ) {
          return true;
        }
      }
    }
    return false;
  }

  protected update(deltaTime: number) {
    for (const other of this.others) {
      if (this.checkCollision(other)) {
        this.onCollision(other);
      }
    }
  }
}
