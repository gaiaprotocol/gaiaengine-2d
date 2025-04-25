import { DomChild, DomNode } from "@commonmodule/app";
import { EventRecord } from "@commonmodule/ts";
import { DomSelector } from "@commonmodule/universal-page";
import TransformableNode from "../core/TransformableNode.js";
import GameScreen from "../screen/GameScreen.js";

export default class DomWrapperNode<
  H extends HTMLElement = HTMLElement,
  E extends EventRecord = {},
> extends TransformableNode<E> {
  protected domNode: DomNode;

  constructor(
    x: number,
    y: number,
    elementOrSelector?: H | DomSelector,
    ...children: DomChild<H>[]
  ) {
    super(x, y);
    this.domNode = new DomNode(elementOrSelector, ...children).style({
      position: "absolute",
      left: "-9999999px",
      top: "-9999999px",
      //outline: GaiaEngineConfig.isDevMode ? "1px solid red" : undefined,
    });
  }

  protected set screen(screen: GameScreen | undefined) {
    if (screen) this.domNode.appendTo(screen);
    super.screen = screen;
  }

  protected get screen() {
    return super.screen;
  }

  protected update(deltaTime: number) {
    super.update(deltaTime);

    if (this.screen) {
      this.domNode.style({
        left: `${this.globalTransform.x * this.screen.scale}px`,
        top: `${this.globalTransform.y * this.screen.scale}px`,
        transform: `translate(-50%, -50%) scale(${
          this.globalTransform.scaleX * this.screen.scale
        }, ${
          this.globalTransform.scaleY * this.screen.scale
        }) rotate(${this.globalTransform.rotation}rad)`,
        opacity: String(this.globalTransform.alpha),
      });
    }
  }

  public remove(): void {
    this.domNode.remove();
    super.remove();
  }
}
