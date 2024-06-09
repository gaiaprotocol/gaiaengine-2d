import { ArrayUtil, TreeNode } from "@common-module/app";
import { Container } from "pixi.js";
import Screen from "./screen/Screen.js";

type WindowEventHandler<ET extends Event, NT extends Node> = (
  event: ET,
  node: NT,
) => any;

export default class Node extends TreeNode {
  declare parent: Node | undefined;
  declare children: Node[];
  private _screen: Screen | undefined;

  public container: Container;

  private windowEventMap: {
    [eventName: string]: {
      eventHandler: (...params: any[]) => any;
      domEventHandler: (...params: any[]) => any;
    }[];
  } = {};

  constructor(x: number, y: number) {
    super();
    this.container = new Container({ x, y });
  }

  public setPosition(x: number, y: number) {
    this.container.position.set(x, y);
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

  public step(deltaTime: number) {
    for (const child of this.children) {
      child.step(deltaTime);
    }
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

  public onWindow<ET extends Event>(
    eventName: string,
    eventHandler: WindowEventHandler<ET, this>,
  ): void {
    if (this.windowEventMap[eventName] === undefined) {
      this.windowEventMap[eventName] = [];
    }
    const domEventHandler = (event: ET) => eventHandler(event, this);
    this.windowEventMap[eventName].push({ eventHandler, domEventHandler });
    window.addEventListener(eventName, domEventHandler as any);
  }

  public offWindow<ET extends Event>(
    eventName: string,
    eventHandler: WindowEventHandler<ET, this>,
  ): void {
    const windowEvents = this.windowEventMap[eventName];
    if (windowEvents !== undefined) {
      const windowEvent = windowEvents.find((we) =>
        we.eventHandler === eventHandler
      );
      if (windowEvent !== undefined) {
        window.removeEventListener(eventName, windowEvent.domEventHandler);
        ArrayUtil.pull(windowEvents, windowEvent);
        if (windowEvents.length === 0) {
          delete this.windowEventMap[eventName];
        }
      }
    }
  }

  public delete(): void {
    this.container.destroy();

    for (const [eventName, domEvents] of Object.entries(this.windowEventMap)) {
      for (const domEvent of domEvents) {
        window.removeEventListener(eventName, domEvent.domEventHandler);
      }
    }
    (this.windowEventMap as unknown) = undefined;

    super.delete();
    (this.container as unknown) = undefined;
  }
}
