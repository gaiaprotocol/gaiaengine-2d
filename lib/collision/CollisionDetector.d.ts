import GameNode from "../core/GameNode.js";
import Collidable from "./Collidable.js";
export default class CollisionDetector<ST extends Collidable, OT extends Collidable> extends GameNode {
    private onCollision;
    private subjects;
    private obstacles;
    constructor(onCollision: (subject: ST, obstacle: OT) => void);
    addSubject(subject: ST): void;
    removeSubject(subject: ST): void;
    addObstacle(obstacle: OT): void;
    removeObstacle(obstacle: OT): void;
    private checkCollision;
    protected update(deltaTime: number): void;
}
//# sourceMappingURL=CollisionDetector.d.ts.map