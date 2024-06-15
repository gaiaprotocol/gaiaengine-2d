import { StyleUtil } from "@common-module/app";
import Interval from "../delay/Interval.js";
import Text from "../dom/Text.js";
import Screen from "../screen/Screen.js";

export default class FpsDisplay extends Text {
  private deltaTime = 0;

  constructor() {
    super(0, 0, "FPS: 0", {
      fontSize: 25,
      color: "#000",
    });
    StyleUtil.applyTextStroke(this.domNode, 2, "#fff");

    this.append(
      new Interval(
        0.1,
        () => this.text = `FPS: ${Math.round(1 / this.deltaTime)}`,
      ),
    );
  }

  public set screen(screen: Screen | undefined) {
    super.screen = screen;
    if (screen) {
      this.x = screen.width / 2 - 60;
      this.y = 30 - screen.height / 2;
    }
  }

  public get screen() {
    return super.screen;
  }

  public update(deltaTime: number): void {
    super.update(deltaTime);
    this.deltaTime = deltaTime;
  }
}
