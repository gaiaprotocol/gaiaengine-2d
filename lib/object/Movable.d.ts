import { Container } from "pixi.js";
import GameNode from "../GameNode.js";
interface MovableOptions {
    speedX?: number;
}
export default class Movable<T extends Container = Container> extends GameNode<T> {
    private options?;
    constructor(container?: T, options?: MovableOptions | undefined);
    step(deltaTime: number): void;
}
export {};
//# sourceMappingURL=Movable.d.ts.map