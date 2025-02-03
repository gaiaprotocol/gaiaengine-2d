import { DomChild, DomNode } from "@common-module/app";
import { DomSelector } from "@common-module/universal-page";
import TransformableNode from "../core/TransformableNode.js";
import GameScreen from "../screen/GameScreen.js";

export default class DomWrapperNode<HE extends HTMLElement = HTMLElement>
  extends TransformableNode {
  protected domNode: DomNode;

  constructor(
    x: number,
    y: number,
    elementOrSelector?: HE | DomSelector,
    ...children: DomChild<HE>[]
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
        left: `${this.globalTransform.x * this.screen.ratio}px`,
        top: `${this.globalTransform.y * this.screen.ratio}px`,
        transform: `translate(-50%, -50%) scale(${
          this.globalTransform.scaleX * this.screen.ratio
        }, ${
          this.globalTransform.scaleY * this.screen.ratio
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
