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
        pivotX: 0,
        pivotY: 0,
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
        alpha: 1,
    };
    globalTransform = {
        x: Number.NEGATIVE_INFINITY,
        y: Number.NEGATIVE_INFINITY,
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
        alpha: 1,
    };
    update(deltaTime) {
        const parent = this.parent;
        const pt = parent?.globalTransform;
        if (pt) {
            const rx = this.transform.x * pt.scaleX;
            const ry = this.transform.y * pt.scaleY;
            const pCos = Math.cos(pt.rotation);
            const pSin = Math.sin(pt.rotation);
            this.globalTransform.scaleX = pt.scaleX * this.transform.scaleX;
            this.globalTransform.scaleY = pt.scaleY * this.transform.scaleY;
            const pivotX = this.transform.pivotX * this.globalTransform.scaleX;
            const pivotY = this.transform.pivotY * this.globalTransform.scaleY;
            const cos = Math.cos(this.transform.rotation);
            const sin = Math.sin(this.transform.rotation);
            this.globalTransform.x = pt.x +
                (rx * pCos - ry * pSin) -
                (pivotX * cos - pivotY * sin);
            this.globalTransform.y = pt.y +
                (rx * pSin + ry * pCos) -
                (pivotX * sin + pivotY * cos);
            this.globalTransform.rotation = pt.rotation + this.transform.rotation;
            this.globalTransform.alpha = pt.alpha * this.transform.alpha;
        }
        super.update(deltaTime);
    }
}
//# sourceMappingURL=TransformableNode.js.map