import { DomChild, DomNode } from "@common-module/app";
import { DomSelector } from "@common-module/universal-page";
import GameObject from "../core/GameObject.js";
import GaiaEngineConfig from "../GaiaEngineConfig.js";
import GameScreen from "../screen/GameScreen.js";

export default class DomWrapperNode<HE extends HTMLElement = HTMLElement>
  extends GameObject {
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
      outline: GaiaEngineConfig.isDevMode ? "1px solid red" : undefined,
    });
  }

  public set screen(screen: GameScreen | undefined) {
    if (screen) this.domNode.appendTo(screen);
    super.screen = screen;
  }

  public get screen() {
    return super.screen;
  }

  protected update(deltaTime: number) {
    super.update(deltaTime);

    this.domNode.style({
      left: `${this.globalTransform.x}px`,
      top: `${this.globalTransform.y}px`,
      transform:
        `translate(-50%, -50%) scale(${this.globalTransform.scaleX}, ${this.globalTransform.scaleY}) rotate(${this.globalTransform.rotation}rad)`,
    });
  }

  public remove(): void {
    this.domNode.remove();
    super.remove();
  }
}
