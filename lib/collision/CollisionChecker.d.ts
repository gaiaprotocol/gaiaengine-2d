import Entity from "../base/Entity.js";
import Collidable from "./Collidable.js";
export default class CollisionChecker extends Entity {
    private target;
    private others;
    private onCollision;
    constructor(target: Collidable, others: Collidable[], onCollision: (collided: Collidable) => void);
    private checkCollision;
    protected update(deltaTime: number): void;
}
//# sourceMappingURL=CollisionChecker.d.ts.map