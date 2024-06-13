import { Container } from "pixi.js";
import Screen from "../screen/Screen.js";
import Entity from "./Entity.js";
export default class Node extends Entity {
    parent: Node | undefined;
    children: Node[];
    private _screen;
    container: Container;
    constructor(x: number, y: number);
    setPosition(x: number, y: number): void;
    set x(x: number);
    get x(): number;
    set y(y: number);
    get y(): number;
    set scaleX(scaleX: number);
    get scaleX(): number;
    hide(): void;
    show(): void;
    set screen(screen: Screen | undefined);
    get screen(): Screen | undefined;
    appendTo(node: Node, index?: number): this;
    delete(): void;
}
//# sourceMappingURL=Node.d.ts.map