import { StyleUtils } from "@common-module/app";
import Interval from "../delay/Interval.js";
import TextNode from "../dom/TextNode.js";
import GameScreen from "../screen/GameScreen.js";

export default class FPSDisplay extends TextNode<{
  fontSize: string;
  color: string;
  textAlign: string;
  width: string;
  height: string;
}> {
  private deltaTime = 0;

  constructor(private additionalX = 0, private additionalY = 0) {
    super(0, 0, "FPS: 0", {
      fontSize: "25px",
      color: "#000",
      textAlign: "center",
      width: "120px",
      height: "40px",
    });
    this.setPivot(60 - this.additionalX, -30 - this.additionalY);
    StyleUtils.applyTextStroke(this.domNode, 2, "#fff");

    new Interval(
      0.1,
      () => this.text = `FPS: ${Math.round(1 / this.deltaTime)}`,
    ).appendTo(this);
  }

  private updatePosition() {
    if (this.screen) {
      this.scale = 1 / this.screen.camera.scale;
      this.setPosition(
        this.screen.camera.getX() +
          this.screen.width / 2 / this.screen.camera.scale,
        this.screen.camera.getY() -
          this.screen.height / 2 / this.screen.camera.scale,
      );
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
    this.updatePosition();
    super.update(deltaTime);
  }
}
