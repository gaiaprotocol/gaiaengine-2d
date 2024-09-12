import { Container } from "pixi.js";
import GameNode from "./GameNode.js";
export default class GameObject extends GameNode {
    protected container: Container;
    constructor(x: number, y: number);
    append(...children: (GameObject | undefined)[]): void;
    appendTo(parent: GameObject, index?: number): void;
}
//# sourceMappingURL=GameObject.d.ts.map