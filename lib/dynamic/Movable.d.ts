import GameObject from "../core/GameObject.js";
export default class Movable extends GameObject {
    speedX: number;
    speedY: number;
    move(angle: number, speed: number): void;
    stop(): void;
    protected update(deltaTime: number): void;
}
//# sourceMappingURL=Movable.d.ts.map