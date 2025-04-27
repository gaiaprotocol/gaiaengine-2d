import GameNode from "../core/GameNode.js";
import ZoneManager from "../zone/ZoneManager.js";
import CollisionChecker from "./CollisionChecker.js";
export default class ZoneCollisionDetector extends GameNode {
    zoneSize;
    onCollision;
    subjects = [];
    zoneObstacleManager;
    constructor(zoneSize, onCollision) {
        super();
        this.zoneSize = zoneSize;
        this.onCollision = onCollision;
        this.zoneObstacleManager = new ZoneManager(zoneSize).appendTo(this);
    }
    addSubject(subject) {
        this.subjects.push(subject);
    }
    removeSubject(subject) {
        const index = this.subjects.indexOf(subject);
        if (index !== -1)
            this.subjects.splice(index, 1);
    }
    addObstacle(obstacle) {
        this.zoneObstacleManager.addObject(obstacle);
    }
    removeObstacle(obstacle) {
        this.zoneObstacleManager.removeObject(obstacle);
    }
    checkCollision(subject, obstacle) {
        for (const subjectCollider of subject.colliders) {
            for (const obstacleCollider of obstacle.colliders) {
                if (CollisionChecker.checkCollision(subjectCollider, subject.globalTransform, obstacleCollider, obstacle.globalTransform)) {
                    return true;
                }
            }
        }
        return false;
    }
    update(deltaTime) {
        super.update(deltaTime);
        for (const subject of this.subjects) {
            const zoneX = Math.floor(subject.x / this.zoneSize);
            const zoneY = Math.floor(subject.y / this.zoneSize);
            for (let zx = zoneX - 1; zx <= zoneX + 1; zx++) {
                for (let zy = zoneY - 1; zy <= zoneY + 1; zy++) {
                    const zoneObjects = this.zoneObstacleManager.getObjectsInZone(zx, zy);
                    if (!zoneObjects)
                        continue;
                    for (const potentialObstacle of zoneObjects) {
                        const obstacle = potentialObstacle;
                        if (this.checkCollision(subject, obstacle)) {
                            this.onCollision(subject, obstacle);
                            if (subject.removed)
                                break;
                        }
                    }
                }
            }
        }
    }
}
//# sourceMappingURL=ZoneCollisionDetector.js.map