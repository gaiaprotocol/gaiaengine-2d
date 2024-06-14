import Collidable from "../collision/Collidable.js";

export default class Movable extends Collidable {
  protected minX = -Infinity;
  protected maxX = Infinity;
  private _speedX = 0;
  protected accelX = 0;
  protected toSpeedX: number | undefined;

  protected set speedX(speedX: number) {
    this._speedX = speedX;
    this.accelX = 0;
    this.toSpeedX = undefined;
  }

  protected get speedX() {
    return this._speedX;
  }

  protected mixY = -Infinity;
  protected maxY = Infinity;
  private _speedY = 0;
  protected accelY = 0;
  protected toSpeedY: number | undefined;

  protected set speedY(speedY: number) {
    this._speedY = speedY;
    this.accelY = 0;
    this.toSpeedY = undefined;
  }

  protected get speedY() {
    return this._speedY;
  }

  protected onMinXReached?: () => void;
  protected onMaxXReached?: () => void;
  protected onMinYReached?: () => void;
  protected onMaxYReached?: () => void;

  protected update(deltaTime: number) {
    if (this.accelX !== 0) {
      this._speedX += this.accelX * deltaTime;
      if (this.toSpeedX !== undefined) {
        if (this.accelX > 0 && this._speedX > this.toSpeedX) {
          this.accelX = 0;
          this._speedX = this.toSpeedX;
          this.toSpeedX = undefined;
        } else if (this.accelX < 0 && this._speedX < this.toSpeedX) {
          this.accelX = 0;
          this._speedX = this.toSpeedX;
          this.toSpeedX = undefined;
        }
      }
    }

    if (
      this._speedX !== 0 &&
      (this._speedX > 0 || this.x !== this.minX) &&
      (this._speedX < 0 || this.x !== this.maxX)
    ) {
      let x = this.container.x + this._speedX * deltaTime;
      if (x < this.minX) {
        x = this.minX;
        this._speedX = 0;
        if (this.onMinXReached) this.onMinXReached();
      } else if (x > this.maxX) {
        x = this.maxX;
        this._speedX = 0;
        if (this.onMaxXReached) this.onMaxXReached();
      }
      this.x = x;
    }

    if (this.accelY !== 0) {
      this._speedY += this.accelY * deltaTime;
      if (this.toSpeedY !== undefined) {
        if (this.accelY > 0 && this._speedY > this.toSpeedY) {
          this.accelY = 0;
          this._speedY = this.toSpeedY;
          this.toSpeedY = undefined;
        } else if (this.accelY < 0 && this._speedY < this.toSpeedY) {
          this.accelY = 0;
          this._speedY = this.toSpeedY;
          this.toSpeedY = undefined;
        }
      }
    }

    if (
      this._speedY !== 0 &&
      (this._speedY > 0 || this.y !== this.mixY) &&
      (this._speedY < 0 || this.y !== this.maxY)
    ) {
      let y = this.container.y + this._speedY * deltaTime;
      if (y < this.mixY) {
        y = this.mixY;
        this._speedY = 0;
        if (this.onMinYReached) this.onMinYReached();
      } else if (y > this.maxY) {
        y = this.maxY;
        this._speedY = 0;
        if (this.onMaxYReached) this.onMaxYReached();
      }
      this.y = y;
    }

    super.update(deltaTime);
  }
}
