import { EventRecord } from "@commonmodule/ts";
import GameObject from "../core/GameObject.js";

export default class Movable<E extends EventRecord = {}> extends GameObject<E> {
  protected minX = -Infinity;
  protected maxX = Infinity;

  protected minY = -Infinity;
  protected maxY = Infinity;

  protected speedX = 0;
  protected speedY = 0;

  protected accelX = 0;
  protected accelY = 0;

  protected minSpeedX = -Infinity;
  protected maxSpeedX = Infinity;

  protected minSpeedY = -Infinity;
  protected maxSpeedY = Infinity;

  protected targetX?: number;
  protected targetY?: number;
  protected onArrive?: () => void;

  public move(radian: number, speed: number): void {
    this.speedX = Math.cos(radian) * speed;
    this.speedY = Math.sin(radian) * speed;
  }

  public moveTo(
    x: number,
    y: number,
    speed: number,
    onArrive?: () => void,
  ): void {
    const dx = x - this.x;
    const dy = y - this.y;
    const distance = Math.hypot(dx, dy);

    if (distance < 1e-6) {
      onArrive?.();
      return;
    }

    const radian = Math.atan2(dy, dx);
    this.move(radian, speed);

    this.targetX = x;
    this.targetY = y;
    this.onArrive = onArrive;
  }

  public stop(): void {
    this.speedX = 0;
    this.speedY = 0;
    this.targetX = undefined;
    this.targetY = undefined;
    this.onArrive = undefined;
  }

  protected update(deltaTime: number): void {
    this.speedX += this.accelX * deltaTime;
    this.speedY += this.accelY * deltaTime;

    if (this.speedX < this.minSpeedX) this.speedX = this.minSpeedX;
    if (this.speedX > this.maxSpeedX) this.speedX = this.maxSpeedX;
    if (this.speedY < this.minSpeedY) this.speedY = this.minSpeedY;
    if (this.speedY > this.maxSpeedY) this.speedY = this.maxSpeedY;

    this.x += this.speedX * deltaTime;
    this.y += this.speedY * deltaTime;

    if (this.x < this.minX) this.x = this.minX;
    if (this.x > this.maxX) this.x = this.maxX;
    if (this.y < this.minY) this.y = this.minY;
    if (this.y > this.maxY) this.y = this.maxY;

    if (this.targetX !== undefined && this.targetY !== undefined) {
      const toTargetX = this.targetX - this.x;
      const toTargetY = this.targetY - this.y;
      const distanceSq = toTargetX * toTargetX + toTargetY * toTargetY;

      // Predict distance we will move this frame. If we've arrived or overshot, snap to target.
      const travelledSq = (this.speedX * deltaTime) ** 2 +
        (this.speedY * deltaTime) ** 2;
      if (
        distanceSq <= travelledSq || Math.hypot(toTargetX, toTargetY) < 1e-3
      ) {
        this.x = this.targetX;
        this.y = this.targetY;
        this.onArrive?.();
        this.stop();
      }
    }

    super.update(deltaTime);
  }
}
