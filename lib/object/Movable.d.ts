import Node from "../Node.js";
export default class Movable extends Node {
    minX: number;
    maxX: number;
    speedX: number;
    constructor(x: number, y: number);
    step(deltaTime: number): void;
}
//# sourceMappingURL=Movable.d.ts.map