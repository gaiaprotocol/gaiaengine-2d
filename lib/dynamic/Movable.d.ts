import { EventRecord } from "@commonmodule/ts";
import GameObject from "../core/GameObject.js";
export default class Movable<E extends EventRecord = EventRecord> extends GameObject<E> {
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
    move(radian: number, speed: number): void;
    stop(): void;
    protected update(deltaTime: number): void;
}
//# sourceMappingURL=Movable.d.ts.map