import { Container } from "pixi.js";
import TransformableNode from "./TransformableNode.js";
export default class GameObject extends TransformableNode {
    protected container: Container;
    constructor(x: number, y: number);
    appendTo(parent: GameObject, index?: number): this;
}
//# sourceMappingURL=GameObject.d.ts.map