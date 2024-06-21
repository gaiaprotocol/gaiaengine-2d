import Screen from "./Screen.js";

export default class Camera {
  public x = 0;
  public y = 0;

  constructor(private screen: Screen) {}

  public setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.screen.updateRootPosition();
  }
}
