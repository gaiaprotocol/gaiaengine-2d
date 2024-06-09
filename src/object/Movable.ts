import Node from "../Node.js";

export default class Movable extends Node {
  public minX = -Infinity;
  public maxX = Infinity;
  public speedX = 0;

  constructor(x: number, y: number) {
    super(x, y);
  }

  public step(deltaTime: number) {
    if (this.speedX !== 0) {
      let x = this.container.x + this.speedX * deltaTime;
      if (x < this.minX) x = this.minX;
      else if (x > this.maxX) x = this.maxX;
      this.container.x = x;
    }
    super.step(deltaTime);
  }
}
