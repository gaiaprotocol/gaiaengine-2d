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
    set x(x) {
        this.transform.x = x;
    }
    get x() {
        return this.transform.x;
    }
    set y(y) {
        this.transform.y = y;
    }
    get y() {
        return this.transform.y;
    }
    setPosition(x, y) {
        this.transform.x = x;
        this.transform.y = y;
        return this;
    }
    setPivot(x, y) {
        this.transform.pivotX = x;
        this.transform.pivotY = y;
        return this;
    }
    set scaleX(scaleX) {
        this.transform.scaleX = scaleX;
    }
    get scaleX() {
        return this.transform.scaleX;
    }
    set scaleY(scaleY) {
        this.transform.scaleY = scaleY;
    }
    get scaleY() {
        return this.transform.scaleY;
    }
    set scale(scale) {
        this.transform.scaleX = scale;
        this.transform.scaleY = scale;
    }
    get scale() {
        return this.transform.scaleX;
    }
    set alpha(alpha) {
        this.transform.alpha = alpha;
    }
    get alpha() {
        return this.transform.alpha;
    }
    set rotation(rotation) {
        this.transform.rotation = rotation;
    }
    get rotation() {
        return this.transform.rotation;
    }
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