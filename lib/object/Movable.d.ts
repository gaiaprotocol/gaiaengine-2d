import Node from "../Node.js";
interface MovableOptions {
    speedX?: number;
}
export default class Movable extends Node {
    private options?;
    constructor(x: number, y: number, options?: MovableOptions | undefined);
    step(deltaTime: number): void;
}
export {};
//# sourceMappingURL=Movable.d.ts.map