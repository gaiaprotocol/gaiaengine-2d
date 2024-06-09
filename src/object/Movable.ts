import Node from "../Node.js";

interface MovableOptions {
  speedX?: number;
}

export default class Movable extends Node {
  constructor(x: number, y: number, private options?: MovableOptions) {
    super(x, y);
  }

  public step(deltaTime: number) {
    if (this.options?.speedX) {
      this.container.x += this.options.speedX * deltaTime;
    }
    super.step(deltaTime);
  }
}
