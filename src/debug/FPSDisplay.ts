import { StyleUtils } from "@common-module/app";
import Interval from "../delay/Interval.js";
import TextNode from "../dom/TextNode.js";
import GameScreen from "../screen/GameScreen.js";

export default class FPSDisplay extends TextNode<{
  fontSize: string;
  color: string;
  textAlign: string;
  width: string;
}> {
  private deltaTime = 0;

  constructor() {
    super(0, 0, "FPS: 0", {
      fontSize: "25px",
      color: "#000",
      textAlign: "center",
      width: "120px",
    });
    StyleUtils.applyTextStroke(this.domNode, 2, "#fff");

    new Interval(
      0.1,
      () => this.text = `FPS: ${Math.round(1 / this.deltaTime)}`,
    ).appendTo(this);
  }

  private updatePosition() {
    if (this.screen) {
      this.transform.x = this.screen.width / 2 - 60;
      this.transform.y = 30 - this.screen.height / 2;
    }
  }

  public set screen(screen: GameScreen | undefined) {
    super.screen = screen;
    this.updatePosition();
  }

  public get screen() {
    return super.screen;
  }

  public update(deltaTime: number): void {
    this.deltaTime = deltaTime;
    super.update(deltaTime);
    this.updatePosition();
  }
}
