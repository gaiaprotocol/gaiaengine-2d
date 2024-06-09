import { Container } from "pixi.js";
import GameNode from "../GameNode.js";

interface MovableOptions {
  speedX?: number;
}

export default class Movable<T extends Container = Container>
  extends GameNode<T> {
  constructor(container?: T, private options?: MovableOptions) {
    super(container);
  }

  public step(deltaTime: number) {
    if (this.options?.speedX) {
      this.container.x += this.options.speedX * deltaTime;
    }
    super.step(deltaTime);
  }
}
