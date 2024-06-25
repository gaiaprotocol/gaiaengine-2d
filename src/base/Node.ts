import { TreeNode } from "@common-module/app";
import { Container } from "pixi.js";
import Screen from "../screen/Screen.js";
import Entity from "./Entity.js";
import Transform from "./Transform.js";

export default class Node extends Entity {
  declare parent: Node | undefined;
  declare children: Node[];
  private _screen: Screen | undefined;

  public container: Container;
  public worldTransform: Transform = {
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    rotation: 0,
  };

  constructor(x: number, y: number, ...children: TreeNode[]) {
    super();
    this.container = new Container({ x, y });
    this.append(...children);
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

  public set scaleY(scaleY: number) {
    this.container.scale.y = scaleY;
  }

  public get scaleY() {
    return this.container.scale.y;
  }

  public set scale(scale: number) {
    this.container.scale = scale;
  }

  public get scale() {
    return this.container.scale.x;
  }

  public set rotation(rotation: number) {
    this.container.rotation = rotation;
  }

  public get rotation() {
    return this.container.rotation;
  }

  public set alpha(alpha: number) {
    this.container.alpha = alpha;
  }

  public get alpha() {
    return this.container.alpha;
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

  protected update(deltaTime: number) {
    if (this.parent) {
      this.worldTransform.x = this.x + this.parent.worldTransform.x;
      this.worldTransform.y = this.y + this.parent.worldTransform.y;
      this.worldTransform.scaleX = this.scaleX *
        this.parent.worldTransform.scaleX;
      this.worldTransform.scaleY = this.scaleY *
        this.parent.worldTransform.scaleY;
      this.worldTransform.rotation = this.rotation +
        this.parent.worldTransform.rotation;
    } else {
      this.worldTransform.x = 0;
      this.worldTransform.y = 0;
      this.worldTransform.scaleX = this.scaleX;
      this.worldTransform.scaleY = this.scaleY;
      this.worldTransform.rotation = this.rotation;
    }
  }

  public delete(): void {
    this.container.destroy();
    super.delete();
    (this.container as unknown) = undefined;
  }
}
