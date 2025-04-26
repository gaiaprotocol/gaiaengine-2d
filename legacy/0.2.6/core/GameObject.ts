import { EventRecord } from "@commonmodule/ts";
import { Container } from "pixi.js";
import DisplayNode from "./DisplayNode.js";
import GameNode from "./GameNode.js";

export default class GameObject<E extends EventRecord = {}>
  extends DisplayNode<Container, E> {
  constructor(x: number, y: number, ...gameNodes: (GameNode | undefined)[]) {
    super(new Container({ x, y }));
    this.append(...gameNodes);
  }
}
