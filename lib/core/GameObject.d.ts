import { Container } from "pixi.js";
import TransformableNode from "./TransformableNode.js";
export default class GameObject extends TransformableNode {
    protected container: Container;
    constructor(x: number, y: number);
    set x(x: number);
    get x(): number;
    set y(y: number);
    get y(): number;
    setPosition(x: number, y: number): this;
    appendTo(parent: GameObject, index?: number): this;
}
//# sourceMappingURL=GameObject.d.ts.map