import GameNode from "../core/GameNode.js";
import CollisionDetector from "./CollisionDetector.js";
export default class CollisionNode extends GameNode {
    collidables;
    obstacles;
    onCollision;
    constructor(collidables, obstacles, onCollision) {
        super();
        this.collidables = collidables;
        this.obstacles = obstacles;
        this.onCollision = onCollision;
    }
    checkCollision(collidable, obstacle) {
        for (const collidableCollider of collidable.colliders) {
            for (const obstacleCollider of obstacle.colliders) {
                if (CollisionDetector.checkCollision(collidableCollider, collidable.absoluteTransform, obstacleCollider, obstacle.absoluteTransform)) {
                    return true;
                }
            }
        }
        return false;
    }
    update(deltaTime) {
        super.update(deltaTime);
        for (const collidable of this.collidables) {
            for (const obstacle of this.obstacles) {
                if (this.checkCollision(collidable, obstacle)) {
                    this.onCollision(collidable, obstacle);
                }
            }
        }
    }
}
//# sourceMappingURL=CollisionNode.js.map