import GameNode from "../core/GameNode.js";
import CollisionChecker from "./CollisionChecker.js";
export default class CollisionDetector extends GameNode {
    onCollision;
    subjects = [];
    obstacles = [];
    constructor(onCollision) {
        super();
        this.onCollision = onCollision;
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
        this.obstacles.push(obstacle);
    }
    removeObstacle(obstacle) {
        const index = this.obstacles.indexOf(obstacle);
        if (index !== -1)
            this.obstacles.splice(index, 1);
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
                    if (subject.isRemoved())
                        break;
                }
            }
        }
    }
}
//# sourceMappingURL=CollisionDetector.js.map