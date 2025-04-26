import GameNode from "../core/GameNode.js";
import GameObject from "../core/GameObject.js";
import Collidable from "./Collidable.js";
export default class ZoneCollisionDetector<ST extends GameObject & Collidable, OT extends GameObject & Collidable> extends GameNode {
    private zoneSize;
    private onCollision;
    private subjects;
    private zoneObstacleManager;
    constructor(zoneSize: number, onCollision: (subject: ST, obstacle: OT) => void);
    addSubject(subject: ST): void;
    removeSubject(subject: ST): void;
    addObstacle(obstacle: OT): void;
    removeObstacle(obstacle: OT): void;
    private checkCollision;
    protected update(deltaTime: number): void;
}
//# sourceMappingURL=ZoneCollisionDetector.d.ts.map