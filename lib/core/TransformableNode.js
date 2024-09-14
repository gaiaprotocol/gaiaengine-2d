import GameNode from "./GameNode.js";
export default class TransformableNode extends GameNode {
    constructor(x, y) {
        super();
        this.transform.x = x;
        this.transform.y = y;
    }
    transform = {
        x: Number.NEGATIVE_INFINITY,
        y: Number.NEGATIVE_INFINITY,
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
    };
    absoluteTransform = {
        x: Number.NEGATIVE_INFINITY,
        y: Number.NEGATIVE_INFINITY,
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
    };
    update(deltaTime) {
        const parent = this.parent;
        const parentTransform = parent?.absoluteTransform;
        if (parentTransform) {
            this.absoluteTransform.x = this.transform.x + parentTransform.x;
            this.absoluteTransform.y = this.transform.y + parentTransform.y;
            this.absoluteTransform.scaleX = this.transform.scaleX *
                parentTransform.scaleX;
            this.absoluteTransform.scaleY = this.transform.scaleY *
                parentTransform.scaleY;
            this.absoluteTransform.rotation = this.transform.rotation +
                parentTransform.rotation;
        }
        super.update(deltaTime);
    }
}
//# sourceMappingURL=TransformableNode.js.map