import GameNode from "../core/GameNode.js";
import CollisionUtils from "./CollisionUtils.js";
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
                if (CollisionUtils.checkCollision(subjectCollider, subject.absoluteTransform, obstacleCollider, obstacle.absoluteTransform)) {
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
//# sourceMappingURL=CollisionDetectorNode.js.map