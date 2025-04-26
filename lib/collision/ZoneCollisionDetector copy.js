import GameNode from "../core/GameNode.js";
import ZoneManager from "../zone/ZoneManager.js";
import CollisionChecker from "./CollisionChecker.js";
export default class CollisionDetector extends GameNode {
    subjects;
    onCollision;
    zoneObstacleManager;
    constructor(subjects, obstacles, zoneSize, onCollision) {
        super();
        this.subjects = subjects;
        this.onCollision = onCollision;
        this.zoneObstacleManager = new ZoneManager(zoneSize);
        for (const obstacle of obstacles) {
            this.zoneObstacleManager.addObject(obstacle);
        }
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
            for (const obstacle of this.obstacles) {
                if (this.checkCollision(subject, obstacle)) {
                    this.onCollision(subject, obstacle);
                }
            }
        }
    }
}
//# sourceMappingURL=ZoneCollisionDetector%20copy.js.map