import GameObject from "../core/GameObject.js";
export default class Movable extends GameObject {
    protected speedX: number;
    protected speedY: number;
    protected minSpeedX: number;
    protected maxSpeedX: number;
    protected minSpeedY: number;
    protected maxSpeedY: number;
    protected accelX: number;
    protected accelY: number;
    move(angle: number, speed: number): void;
    stop(): void;
    protected update(deltaTime: number): void;
}
//# sourceMappingURL=Movable.d.ts.map