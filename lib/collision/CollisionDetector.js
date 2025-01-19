import GameNode from "../core/GameNode.js";
import CollisionChecker from "./CollisionChecker.js";
export default class CollisionDetector extends GameNode {
    subjects;
    obstacles;
    onCollision;
    constructor(subjects, obstacles, onCollision) {
        super();
        this.subjects = subjects;
        this.obstacles = obstacles;
        this.onCollision = onCollision;
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
//# sourceMappingURL=CollisionDetector.js.map