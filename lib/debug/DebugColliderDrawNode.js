import ColliderType from "../collision/colliders/ColliderType.js";
import GameObject from "../core/GameObject.js";
import CircleNode from "../shapes/CircleNode.js";
export default class DebugColliderDrawNode extends GameObject {
    strokeColor;
    parentScale = 1;
    constructor(strokeColor) {
        super(0, 0);
        this.strokeColor = strokeColor;
    }
    appendTo(parent, index) {
        if (parent instanceof GameObject && parent.colliders !== undefined) {
            this.parentScale = parent.scale;
            for (const collider of parent.colliders) {
                if (collider.type === ColliderType.Circle) {
                    this.append(new CircleNode(collider.x, collider.y, collider.radius, undefined, { color: this.strokeColor, width: 1 / this.parentScale }));
                }
            }
        }
        return super.appendTo(parent, index);
    }
    update(deltaTime) {
        super.update(deltaTime);
        if (this.parent instanceof GameObject &&
            this.parent.scale !== this.parentScale) {
            this.parentScale = this.parent.scale;
            for (const child of this.children) {
                if (child instanceof CircleNode) {
                    child.stroke = {
                        color: this.strokeColor,
                        width: 1 / this.parentScale,
                    };
                }
            }
        }
    }
}
//# sourceMappingURL=DebugColliderDrawNode.js.map