import { Container } from "pixi.js";
import TransformableNode from "./TransformableNode.js";
export default class GameObject extends TransformableNode {
    container;
    constructor(x, y) {
        super();
        this.container = new Container({ x, y });
    }
    appendTo(parent, index) {
        index !== undefined
            ? parent.container.addChildAt(this.container, index)
            : parent.container.addChild(this.container);
        return super.appendTo(parent, index);
    }
}
//# sourceMappingURL=GameObject.js.map