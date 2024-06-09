import { TreeNode } from "@common-module/app";
import { Container } from "pixi.js";
import Screen from "./screen/Screen.js";

export default class Node extends TreeNode {
  declare parent: Node | undefined;
  declare children: Node[];
  private _screen: Screen | undefined;

  public container: Container;

  constructor(x: number, y: number) {
    super();
    this.container = new Container({ x, y });
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

  public appendTo(node: Node, index?: number): this {
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

  public setPosition(x: number, y: number) {
    this.container.position.set(x, y);
  }

  public hide(): void {
    this.container.visible = false;
  }

  public show(): void {
    this.container.visible = true;
  }

  public delete(): void {
    this.container.destroy();
    super.delete();
  }
}
