import { Container } from "pixi.js";
import GameNode from "./GameNode.js";
import TransformableNode from "./TransformableNode.js";
export default class DisplayNode<CT extends Container = Container> extends TransformableNode {
    protected container: CT;
    constructor(container: CT);
    set x(x: number);
    get x(): number;
    set y(y: number);
    get y(): number;
    setPosition(x: number, y: number): this;
    set scale(scale: number);
    get scale(): number;
    appendTo(parent: GameNode, index?: number): this;
    remove(): void;
    hide(): void;
    show(): void;
}
//# sourceMappingURL=DisplayNode.d.ts.map