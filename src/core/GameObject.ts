import { Container } from "pixi.js";
import GameNode from "./GameNode.js";

export default class GameObject extends GameNode {
  protected container: Container;

  constructor(x: number, y: number) {
    super();
    this.container = new Container({ x, y });
  }

  public append(...children: (GameObject | undefined)[]) {
    for (const child of children) {
      if (child === undefined) continue;
      else child.appendTo(this);
    }
  }

  public appendTo(parent: GameObject, index?: number) {
    index !== undefined
      ? parent.container.addChildAt(this.container, index)
      : parent.container.addChild(this.container);

    super.appendTo(parent, index);
  }
}
