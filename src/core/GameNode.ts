import { TreeNode } from "@common-module/ts";
import GameScreen from "../screen/GameScreen.js";

export default abstract class GameNode extends TreeNode<GameNode> {
  private _screen: GameScreen | undefined;

  protected set screen(screen: GameScreen | undefined) {
    this._screen = screen;
    for (const child of this.children) {
      child.screen = screen;
    }
  }

  protected get screen() {
    return this._screen;
  }

  public append(...children: (GameNode | undefined)[]) {
    for (const child of children) {
      if (child === undefined) continue;
      else child.appendTo(this);
    }
  }

  public appendTo(parent: GameNode, index?: number): this {
    this.screen = parent.screen;
    return super.appendTo(parent, index);
  }

  protected update(deltaTime: number): void {
    if (!this.removed) {
      for (const child of this.children) {
        child.update(deltaTime);
      }
    }
  }
}
