import { EventRecord } from "@commonmodule/ts";
import GameObject from "../core/GameObject.js";
export default class Movable<E extends EventRecord = {}> extends GameObject<E> {
    protected minX: number;
    protected maxX: number;
    protected minY: number;
    protected maxY: number;
    protected speedX: number;
    protected speedY: number;
    protected accelX: number;
    protected accelY: number;
    protected minSpeedX: number;
    protected maxSpeedX: number;
    protected minSpeedY: number;
    protected maxSpeedY: number;
    protected targetX?: number;
    protected targetY?: number;
    protected onArrive?: () => void;
    move(radian: number, speed: number): void;
    moveTo(x: number, y: number, speed: number, onArrive?: () => void): void;
    stop(): void;
    protected update(deltaTime: number): void;
}
//# sourceMappingURL=Movable.d.ts.map