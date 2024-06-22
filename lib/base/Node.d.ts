import { Container } from "pixi.js";
import Screen from "../screen/Screen.js";
import Entity from "./Entity.js";
import Transform from "./Transform.js";
export default class Node extends Entity {
    parent: Node | undefined;
    children: Node[];
    private _screen;
    container: Container;
    worldTransform: Transform;
    constructor(x: number, y: number, ...children: Node[]);
    setPosition(x: number, y: number): void;
    set x(x: number);
    get x(): number;
    set y(y: number);
    get y(): number;
    set scaleX(scaleX: number);
    get scaleX(): number;
    set scaleY(scaleY: number);
    get scaleY(): number;
    set scale(scale: number);
    get scale(): number;
    set rotation(rotation: number);
    get rotation(): number;
    set alpha(alpha: number);
    get alpha(): number;
    hide(): void;
    show(): void;
    set screen(screen: Screen | undefined);
    get screen(): Screen | undefined;
    appendTo(node: Node, index?: number): this;
    protected update(deltaTime: number): void;
    delete(): void;
}
//# sourceMappingURL=Node.d.ts.map