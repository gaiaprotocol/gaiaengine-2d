import Screen from "./Screen.js";

export default class Camera {
  public x = 0;
  public y = 0;
  private _scale = 1;

  constructor(private screen: Screen) {}

  public setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.screen.updateRootPosition();
  }

  public set scale(value: number) {
    this._scale = value;
    this.screen.updateRootPosition();
  }

  public get scale() {
    return this._scale;
  }
}
