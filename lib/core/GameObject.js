import { Container } from "pixi.js";
import TransformableNode from "./TransformableNode.js";
export default class GameObject extends TransformableNode {
    container;
    constructor(x, y) {
        super(x, y);
        this.container = new Container({ x, y });
    }
    set x(x) {
        this.transform.x = x;
        this.container.x = x;
    }
    get x() {
        return this.container.x;
    }
    set y(y) {
        this.transform.y = y;
        this.container.y = y;
    }
    get y() {
        return this.container.y;
    }
    setPosition(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    appendTo(parent, index) {
        index !== undefined
            ? parent.container.addChildAt(this.container, index)
            : parent.container.addChild(this.container);
        return super.appendTo(parent, index);
    }
}
//# sourceMappingURL=GameObject.js.map