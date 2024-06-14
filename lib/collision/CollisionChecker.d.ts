import Entity from "../base/Entity.js";
import Collidable from "./Collidable.js";
export default class CollisionChecker<T extends Collidable> extends Entity {
    private target;
    private others;
    private onCollision;
    constructor(target: Collidable, others: T[], onCollision: (collided: T) => void);
    private checkCollision;
    protected update(deltaTime: number): void;
}
//# sourceMappingURL=CollisionChecker.d.ts.map