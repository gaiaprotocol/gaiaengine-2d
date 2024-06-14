import Node from "../base/Node.js";
export default class Collidable extends Node {
    colliders = [];
    addCollider(...collider) {
        this.colliders.push(...collider);
    }
}
//# sourceMappingURL=Collidable.js.map