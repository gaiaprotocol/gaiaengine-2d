import { EventRecord } from "@commonmodule/ts";
import GameObject from "../core/GameObject.js";

export default class Movable<E extends EventRecord = EventRecord>
  extends GameObject<E> {
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

  public move(radian: number, speed: number): void {
    this.speedX = Math.cos(radian) * speed;
    this.speedY = Math.sin(radian) * speed;
  }

  public stop(): void {
    this.speedX = 0;
    this.speedY = 0;
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

    super.update(deltaTime);
  }
}
