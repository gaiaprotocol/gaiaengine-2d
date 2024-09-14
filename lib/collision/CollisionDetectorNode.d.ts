import GameNode from "../core/GameNode.js";
import Collidable from "./Collidable.js";
export default class CollisionDetector<ST extends Collidable, OT extends Collidable> extends GameNode {
    private subjects;
    private obstacles;
    private onCollision;
    constructor(subjects: ST[], obstacles: OT[], onCollision: (subject: ST, obstacle: OT) => void);
    private checkCollision;
    protected update(deltaTime: number): void;
}
//# sourceMappingURL=CollisionDetectorNode.d.ts.map