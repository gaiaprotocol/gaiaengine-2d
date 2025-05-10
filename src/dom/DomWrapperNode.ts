import { Dom } from "@commonmodule/app";
import GameNode from "../core/GameNode.js";
import TransformableNode from "../core/TransformableNode.js";
import GameScreen from "../screen/GameScreen.js";

export default class DomWrapperNode extends TransformableNode {
  constructor(x: number, y: number, public dom: Dom) {
    super(x, y);
    this.dom.style({
      position: "absolute",
      left: "-9999999px",
      top: "-9999999px",
      //outline: GaiaEngineConfig.isDevMode ? "1px solid red" : undefined,
    });
  }

  protected set screen(screen: GameScreen | undefined) {
    if (screen) this.dom.appendTo(screen);
    super.screen = screen;
  }

  protected get screen() {
    return super.screen;
  }

  private updateStyle() {
    if (this.screen) {
      this.dom.style({
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

  protected update(deltaTime: number) {
    super.update(deltaTime);
    this.updateStyle();
  }

  public appendTo(parent: GameNode, index?: number): this {
    super.appendTo(parent, index);
    this.updateStyle();
    return this;
  }

  public remove(): void {
    this.dom.remove();
    super.remove();
  }
}
