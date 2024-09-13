import GameNode from "./GameNode.js";
export default class TransformableNode extends GameNode {
    x = 0;
    y = 0;
    scaleX = 1;
    scaleY = 1;
    rotation = 0;
    absoluteTransform = {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
    };
    update(deltaTime) {
        const parent = this.parent;
        const parentTransform = parent?.absoluteTransform;
        if (parentTransform) {
            this.absoluteTransform.x = this.x + parentTransform.x;
            this.absoluteTransform.y = this.y + parentTransform.y;
            this.absoluteTransform.scaleX = this.scaleX * parentTransform.scaleX;
            this.absoluteTransform.scaleY = this.scaleY * parentTransform.scaleY;
            this.absoluteTransform.rotation = this.rotation +
                parentTransform.rotation;
        }
        super.update(deltaTime);
    }
}
//# sourceMappingURL=TransformableNode.js.map