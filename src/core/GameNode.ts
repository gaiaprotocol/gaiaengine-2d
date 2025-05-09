import { EventHandlers, EventNode } from "@commonmodule/ts";
import GameScreen from "../screen/GameScreen.js";

export default abstract class GameNode<E extends EventHandlers = {}>
  extends EventNode<GameNode, E> {
  private _screen: GameScreen | undefined;

  protected set screen(screen: GameScreen | undefined) {
    if (this._screen === screen) return;

    this._screen = screen;
    for (const child of this.children) {
      child.screen = screen;
    }
  }

  protected get screen() {
    return this._screen;
  }

  public append(...children: (GameNode | undefined)[]): this {
    for (const child of children) {
      if (child === undefined) continue;
      else child.appendTo(this);
    }
    return this;
  }

  public appendTo(parent: GameNode, index?: number): this {
    this.screen = parent.screen;
    return super.appendTo(parent, index);
  }

  protected update(deltaTime: number): void {
    if (!this.isRemoved()) {
      for (const child of this.children) {
        child.update(deltaTime);
      }
    }
  }
}
