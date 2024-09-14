import GameNode from "../core/GameNode.js";
import Collidable from "./Collidable.js";
export default class CollisionNode<CT extends Collidable> extends GameNode {
    private collidables;
    private obstacles;
    private onCollision;
    constructor(collidables: Collidable[], obstacles: CT[], onCollision: (collidable: Collidable, obstacle: CT) => void);
    private checkCollision;
    protected update(deltaTime: number): void;
}
//# sourceMappingURL=CollisionNode.d.ts.map