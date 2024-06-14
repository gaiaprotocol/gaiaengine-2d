import { ArrayUtil } from "@common-module/app";
import Node from "./Node.js";

type WindowEventHandler<ET extends Event, NT extends Node> = (
  event: ET,
  node: NT,
) => any;

export default class WindowEventNode extends Node {
  private windowEventMap: {
    [eventName: string]: {
      eventHandler: (...params: any[]) => any;
      domEventHandler: (...params: any[]) => any;
    }[];
  } = {};

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
    for (const [eventName, domEvents] of Object.entries(this.windowEventMap)) {
      for (const domEvent of domEvents) {
        window.removeEventListener(eventName, domEvent.domEventHandler);
      }
    }
    (this.windowEventMap as unknown) = undefined;
    super.delete();
  }
}
