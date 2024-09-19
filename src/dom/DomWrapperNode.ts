import { DomChild, DomNode, DomSelector } from "@common-module/app";
import TransformableNode from "../core/TransformableNode.js";
import GaiaEngineConfig from "../GaiaEngineConfig.js";
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
      outline: GaiaEngineConfig.isDevMovde ? "1px solid red" : undefined,
    });
  }

  public set screen(screen: GameScreen | undefined) {
    if (screen) this.domNode.appendTo(screen);
    super.screen = screen;
  }

  public get screen() {
    return super.screen;
  }

  private previousTransform = {
    left: Number.NEGATIVE_INFINITY,
    top: Number.NEGATIVE_INFINITY,
    scaleX: 1,
    scaleY: 1,
  };

  protected resetPreviousTransform() {
    this.previousTransform = {
      left: Number.NEGATIVE_INFINITY,
      top: Number.NEGATIVE_INFINITY,
      scaleX: 1,
      scaleY: 1,
    };
  }

  protected update(deltaTime: number) {
    super.update(deltaTime);

    if (this.screen) {
      const calculatedLeft =
        (this.absoluteTransform.x * this.absoluteTransform.scaleX -
          this.screen.camera.x + this.screen.width / 2) * this.screen.ratio;
      const calculatedTop =
        (this.absoluteTransform.y * this.absoluteTransform.scaleY -
          this.screen.camera.y + this.screen.height / 2) * this.screen.ratio;
      const calculatedScaleX = this.absoluteTransform.scaleX *
        this.screen.ratio;
      const calculatedScaleY = this.absoluteTransform.scaleY *
        this.screen.ratio;

      const hasTransformChanged =
        this.previousTransform.left !== calculatedLeft ||
        this.previousTransform.top !== calculatedTop ||
        this.previousTransform.scaleX !== calculatedScaleX ||
        this.previousTransform.scaleY !== calculatedScaleY;

      if (hasTransformChanged) {
        this.previousTransform.left = calculatedLeft;
        this.previousTransform.top = calculatedTop;
        this.previousTransform.scaleX = calculatedScaleX;
        this.previousTransform.scaleY = calculatedScaleY;

        this.domNode.style({
          transform: `scale(${calculatedScaleX}, ${calculatedScaleY})`,
        });

        const rect = this.domNode.calculateRect();
        this.domNode.style({
          left: `${calculatedLeft - rect.width / 2 / calculatedScaleX}px`,
          top: `${calculatedTop - rect.height / 2 / calculatedScaleY}px`,
        });
      }
    }
  }

  public remove(): void {
    this.domNode.remove();
    super.remove();
  }
}
