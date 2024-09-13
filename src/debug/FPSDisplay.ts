import Interval from "../delay/Interval.js";
import TextNode from "../dom/TextNode.js";
import GameScreen from "../screen/GameScreen.js";

export default class FPSDisplay extends TextNode {
  private deltaTime = 0;

  constructor() {
    super(0, 0, "FPS: 0");

    new Interval(
      0.1,
      () => this.text = `FPS: ${Math.round(1 / this.deltaTime)}`,
    ).appendTo(this);
  }

  private updatePosition() {
    if (this.screen) {
      this.x = this.screen.width / 2 - 60;
      this.y = 30 - this.screen.height / 2;
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
    super.update(deltaTime);
    this.deltaTime = deltaTime;
    this.updatePosition();
  }
}
