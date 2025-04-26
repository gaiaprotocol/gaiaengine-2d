import GameScreen from "./GameScreen.js";

export default class Camera {
  private _x = 0;
  private _y = 0;
  private _scale = 1;

  constructor(private screen: GameScreen) {}

  public getX() {
    return this._x;
  }

  public getY() {
    return this._y;
  }

  public setPosition(x: number, y: number) {
    this._x = x;
    this._y = y;
    this.screen.updateRootNodePosition();
  }

  public set scale(value: number) {
    this._scale = value;
    this.screen.updateRootNodePosition();
  }

  public get scale() {
    return this._scale;
  }
}
