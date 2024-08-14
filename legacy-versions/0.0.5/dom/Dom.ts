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
    document.fonts.addEventListener("loadingdone", this.clearBefore);
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
  private beforeScaleX = 1;
  private beforeScaleY = 1;

  protected clearBefore = () => {
    this.beforeLeft = -9999999;
    this.beforeTop = -9999999;
    this.beforeScaleX = 1;
    this.beforeScaleY = 1;
  };

  public update(deltaTime: number) {
    super.update(deltaTime);

    if (this.screen) {
      const left =
        (this.worldTransform.x * this.worldTransform.scaleX -
          this.screen.camera.x + this.screen.width / 2) * this.screen.ratio;
      const top = (this.worldTransform.y * this.worldTransform.scaleY -
        this.screen.camera.y + this.screen.height / 2) * this.screen.ratio;
      const scaleX = this.worldTransform.scaleX * this.screen.ratio;
      const scaleY = this.worldTransform.scaleY * this.screen.ratio;

      if (
        this.beforeLeft !== left || this.beforeTop !== top ||
        this.beforeScaleX !== scaleX || this.beforeScaleY !== scaleY
      ) {
        this.beforeLeft = left;
        this.beforeTop = top;
        this.beforeScaleX = scaleX;
        this.beforeScaleY = scaleY;

        this.domNode.style({ transform: `scale(${scaleX}, ${scaleY})` });

        const rect = this.domNode.rect;
        this.domNode.style({
          left: left - rect.width / 2 / scaleX,
          top: top - rect.height / 2 / scaleY,
        });
      }
    }
  }

  public delete(): void {
    this.domNode.delete();
    document.fonts.removeEventListener("loadingdone", this.clearBefore);
    super.delete();
  }
}
