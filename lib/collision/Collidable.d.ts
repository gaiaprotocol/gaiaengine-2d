import Node from "../base/Node.js";
import Collider from "./Collider.js";
export default class Collidable extends Node {
    colliders: Collider[];
    protected addCollider(...collider: Collider[]): void;
}
//# sourceMappingURL=Collidable.d.ts.map