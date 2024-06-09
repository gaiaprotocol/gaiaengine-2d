import { DomChild, DomNode } from "@common-module/app";
import Node from "../Node.js";
import Screen from "../screen/Screen.js";

export default class Dom extends Node {
  protected domNode: DomNode;

  constructor(x: number, y: number, tag: string, ...children: DomChild[]) {
    super(x, y);
    this.domNode = new DomNode(tag, ...children);
    this.domNode.style({
      position: "absolute",
      left: -9999999,
      top: -9999999,
    });
  }

  public set screen(screen: Screen | undefined) {
    if (screen) this.domNode.appendTo(screen);
    super.screen = screen;
  }

  public get screen() {
    return super.screen;
  }

  private beforeLeft = -9999999;
  private beforeTop = -9999999;

  public step(deltaTime: number) {
    if (this.screen) {
      const globalPosition = this.screen.root.container.toGlobal(
        this.container.position,
      );

      const left = globalPosition.x * this.screen.ratio;
      const top = globalPosition.y * this.screen.ratio;

      if (this.beforeLeft !== left || this.beforeTop !== top) {
        this.beforeLeft = left;
        this.beforeTop = top;

        this.domNode.style({ transform: `scale(${this.screen.ratio})` });

        const rect = this.domNode.rect;
        this.domNode.style({
          left: left - rect.width / 2 / this.screen.ratio,
          top: top - rect.height / 2 / this.screen.ratio,
        });
      }
    }
    super.step(deltaTime);
  }

  public delete(): void {
    this.domNode.delete();
    super.delete();
  }
}
