import GameNode from "../core/GameNode.js";
import Collidable from "./Collidable.js";
import CollisionChecker from "./CollisionChecker.js";

export default class CollisionDetector<
  ST extends Collidable,
  OT extends Collidable,
> extends GameNode {
  private subjects: ST[] = [];
  private obstacles: OT[] = [];

  constructor(private onCollision: (subject: ST, obstacle: OT) => void) {
    super();
  }

  public addSubject(subject: ST): void {
    this.subjects.push(subject);
  }

  public removeSubject(subject: ST): void {
    const index = this.subjects.indexOf(subject);
    if (index !== -1) this.subjects.splice(index, 1);
  }

  public addObstacle(obstacle: OT): void {
    this.obstacles.push(obstacle);
  }

  public removeObstacle(obstacle: OT): void {
    const index = this.obstacles.indexOf(obstacle);
    if (index !== -1) this.obstacles.splice(index, 1);
  }

  private checkCollision(subject: ST, obstacle: OT): boolean {
    for (const subjectCollider of subject.colliders) {
      for (const obstacleCollider of obstacle.colliders) {
        if (
          CollisionChecker.checkCollision(
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
