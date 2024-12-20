import GameNode from "../core/GameNode.js";
import Collidable from "./Collidable.js";
import CollisionUtils from "./CollisionUtils.js";

export default class CollisionDetector<
  ST extends Collidable,
  OT extends Collidable,
> extends GameNode {
  constructor(
    private subjects: ST[],
    private obstacles: OT[],
    private onCollision: (subject: ST, obstacle: OT) => void,
  ) {
    super();
  }

  private checkCollision(subject: ST, obstacle: OT): boolean {
    for (const subjectCollider of subject.colliders) {
      for (const obstacleCollider of obstacle.colliders) {
        if (
          CollisionUtils.checkCollision(
            subjectCollider,
            subject.globalTransform,
            obstacleCollider,
            obstacle.globalTransform,
          )
        ) {
          return true;
        }
      }
    }
    return false;
  }

  protected update(deltaTime: number): void {
    super.update(deltaTime);

    for (const subject of this.subjects) {
      for (const obstacle of this.obstacles) {
        if (this.checkCollision(subject, obstacle)) {
          this.onCollision(subject, obstacle);
        }
      }
    }
  }
}
