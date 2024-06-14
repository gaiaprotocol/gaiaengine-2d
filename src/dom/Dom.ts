import { DomChild, DomNode } from "@common-module/app";
import Node from "../base/Node.js";
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

  public update(deltaTime: number) {
    super.update(deltaTime);

    if (this.screen) {
      const left = this.worldTransform.x * this.screen.ratio;
      const top = this.worldTransform.y * this.screen.ratio;

      if (this.beforeLeft !== left || this.beforeTop !== top) {
        this.beforeLeft = left;
        this.beforeTop = top;

        this.domNode.style({
          transform: `scale(${
            this.worldTransform.scaleX * this.screen.ratio
          }, ${this.worldTransform.scaleY * this.screen.ratio})`,
        });

        const rect = this.domNode.rect;
        this.domNode.style({
          left: left - rect.width / 2 / this.screen.ratio,
          top: top - rect.height / 2 / this.screen.ratio,
        });
      }
    }
  }

  public delete(): void {
    this.domNode.delete();
    super.delete();
  }
}
