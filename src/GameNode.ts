import { TreeNode } from "@common-module/app";
import { Container } from "pixi.js";
import Screen from "./screen/Screen.js";

export default class GameNode<T extends Container = Container>
  extends TreeNode {
  public container: T;
  private _screen: Screen | undefined;

  protected children: GameNode[] = [];

  constructor(container?: T) {
    super();
    this.container = container ?? new Container() as T;
  }

  public set screen(screen: Screen | undefined) {
    this._screen = screen;
    for (const child of this.children) {
      child.screen = screen;
    }
  }

  public get screen() {
    return this._screen;
  }

  public appendTo(node: GameNode, index?: number): this {
    if (index !== undefined && index < node.children.length) {
      node.container.addChildAt(this.container, index);
    } else {
      node.container.addChild(this.container);
    }
    this.screen = node.screen;
    return super.appendTo(node, index);
  }

  public step(deltaTime: number) {
    for (const child of this.children) {
      child.step(deltaTime);
    }
  }
}
