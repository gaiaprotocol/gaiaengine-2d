import { Container } from "pixi.js";
import GameNode from "../GameNode.js";

export interface MovableOptions {
  speedX?: number;
}

export default class Movable<T extends Container = Container>
  extends GameNode<T> {
  constructor(container?: T, options?: MovableOptions) {
    super(container);
  }
}
