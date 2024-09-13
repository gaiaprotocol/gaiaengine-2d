import GameObject from "../core/GameObject.js";

export default class Movable extends GameObject {
  public speedX: number = 0;

  protected update(deltaTime: number): void {
    this.x += this.speedX * deltaTime;
    super.update(deltaTime);
  }
}
