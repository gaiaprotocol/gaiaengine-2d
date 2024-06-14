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
    constructor(x: number, y: number);
    setPosition(x: number, y: number): void;
    set x(x: number);
    get x(): number;
    set y(y: number);
    get y(): number;
    set scaleX(scaleX: number);
    get scaleX(): number;
    set scaleY(scaleY: number);
    get scaleY(): number;
    set rotation(rotation: number);
    get rotation(): number;
    hide(): void;
    show(): void;
    set screen(screen: Screen | undefined);
    get screen(): Screen | undefined;
    appendTo(node: Node, index?: number): this;
    protected update(deltaTime: number): void;
    delete(): void;
}
//# sourceMappingURL=Node.d.ts.map