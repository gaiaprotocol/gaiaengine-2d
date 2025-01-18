import GameObject from "../core/GameObject.js";

export default class Movable extends GameObject {
  protected speedX = 0;
  protected speedY = 0;

  protected minSpeedX = -Infinity;
  protected maxSpeedX = Infinity;

  protected minSpeedY = -Infinity;
  protected maxSpeedY = Infinity;

  protected accelX = 0;
  protected accelY = 0;

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

    super.update(deltaTime);
  }
}
