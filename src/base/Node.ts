import { Container } from "pixi.js";
import Screen from "../screen/Screen.js";
import Entity from "./Entity.js";

export default class Node extends Entity {
  declare parent: Node | undefined;
  declare children: Node[];
  private _screen: Screen | undefined;

  public container: Container;

  constructor(x: number, y: number) {
    super();
    this.container = new Container({ x, y });
  }

  public setPosition(x: number, y: number) {
    this.container.position.set(x, y);
  }

  public set x(x: number) {
    this.container.x = x;
  }

  public get x() {
    return this.container.x;
  }

  public set y(y: number) {
    this.container.y = y;
  }

  public get y() {
    return this.container.y;
  }

  public set scaleX(scaleX: number) {
    this.container.scale.x = scaleX;
  }

  public get scaleX() {
    return this.container.scale.x;
  }

  public hide(): void {
    this.container.visible = false;
  }

  public show(): void {
    this.container.visible = true;
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

  public delete(): void {
    this.container.destroy();
    super.delete();
    (this.container as unknown) = undefined;
  }
}
