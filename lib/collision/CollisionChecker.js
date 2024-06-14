import Entity from "../base/Entity.js";
import CollisionUtil from "./CollisionUtil.js";
export default class CollisionChecker extends Entity {
    target;
    others;
    onCollision;
    constructor(target, others, onCollision) {
        super();
        this.target = target;
        this.others = others;
        this.onCollision = onCollision;
    }
    checkCollision(other) {
        for (const targetCollider of this.target.colliders) {
            for (const otherCollider of other.colliders) {
                if (CollisionUtil.check(targetCollider, this.target.worldTransform, otherCollider, other.worldTransform)) {
                    return true;
                }
            }
        }
        return false;
    }
    update(deltaTime) {
        for (const other of this.others) {
            if (this.checkCollision(other)) {
                this.onCollision(other);
            }
        }
    }
}
//# sourceMappingURL=CollisionChecker.js.map