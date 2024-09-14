import { Container } from "pixi.js";
import TransformableNode from "./TransformableNode.js";
export default class DisplayNode<CT extends Container = Container> extends TransformableNode {
    protected container: CT;
    constructor(container: CT);
    set x(x: number);
    get x(): number;
    set y(y: number);
    get y(): number;
    setPosition(x: number, y: number): this;
    appendTo(parent: DisplayNode, index?: number): this;
}
//# sourceMappingURL=DisplayNode.d.ts.map