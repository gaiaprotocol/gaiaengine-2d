import GameNode from "../core/GameNode.js";
import GameObject from "../core/GameObject.js";
import ZoneManager from "../zone/ZoneManager.js";
import Collidable from "./Collidable.js";
import CollisionChecker from "./CollisionChecker.js";

export default class ZoneCollisionDetector<
  ST extends GameObject & Collidable,
  OT extends GameObject & Collidable,
> extends GameNode {
  private subjects: ST[] = [];
  private zoneObstacleManager: ZoneManager<OT>;

  constructor(
    private zoneSize: number,
    private onCollision: (subject: ST, obstacle: OT) => void,
  ) {
    super();
    this.zoneObstacleManager = new ZoneManager<OT>(zoneSize).appendTo(this);
  }

  public addSubject(subject: ST): void {
    this.subjects.push(subject);
  }

  public removeSubject(subject: ST): void {
    const index = this.subjects.indexOf(subject);
    if (index !== -1) this.subjects.splice(index, 1);
  }

  public addObstacle(obstacle: OT): void {
    this.zoneObstacleManager.addObject(obstacle);
  }

  public removeObstacle(obstacle: OT): void {
    this.zoneObstacleManager.removeObject(obstacle);
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
      const zoneX = Math.floor(subject.x / this.zoneSize);
      const zoneY = Math.floor(subject.y / this.zoneSize);

      for (let zx = zoneX - 1; zx <= zoneX + 1; zx++) {
        for (let zy = zoneY - 1; zy <= zoneY + 1; zy++) {
          const zoneObjects = this.zoneObstacleManager.getObjectsInZone(zx, zy);
          if (!zoneObjects) continue;

          for (const potentialObstacle of zoneObjects) {
            const obstacle = potentialObstacle;
            if (this.checkCollision(subject, obstacle)) {
              this.onCollision(subject, obstacle);
            }
          }
        }
      }
    }
  }
}
