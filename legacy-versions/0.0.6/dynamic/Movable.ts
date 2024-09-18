import GameObject from "../core/GameObject.js";

export default class Movable extends GameObject {
  public speedX: number = 0;
  public speedY: number = 0;

  public move(angle: number, speed: number): void {
    this.speedX = Math.cos(angle) * speed;
    this.speedY = Math.sin(angle) * speed;
  }

  public stop(): void {
    this.speedX = 0;
    this.speedY = 0;
  }

  protected update(deltaTime: number): void {
    this.x += this.speedX * deltaTime;
    this.y += this.speedY * deltaTime;
    super.update(deltaTime);
  }
}
