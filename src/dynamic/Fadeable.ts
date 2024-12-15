import GameObject from "../core/GameObject.js";

export default class Fadeable extends GameObject {
  protected fadingSpeed = 0;

  protected minFadingSpeed = -Infinity;
  protected maxFadingSpeed = Infinity;

  protected fadingAccel = 0;

  public fadeIn(duration: number): void {
    this.fadingSpeed = (1 - this.alpha) / duration;
  }

  public fadeOut(duration: number): void {
    this.fadingSpeed = (0 - this.alpha) / duration;
  }

  protected update(deltaTime: number): void {
    this.fadingSpeed += this.fadingAccel * deltaTime;

    if (this.fadingSpeed < this.minFadingSpeed) {
      this.fadingSpeed = this.minFadingSpeed;
    }
    if (this.fadingSpeed > this.maxFadingSpeed) {
      this.fadingSpeed = this.maxFadingSpeed;
    }

    if (this.fadingSpeed !== 0) {
      this.alpha += this.fadingSpeed * deltaTime;

      if (this.alpha < 0) {
        this.alpha = 0;
        this.fadingSpeed = 0;
      }

      if (this.alpha > 1) {
        this.alpha = 1;
        this.fadingSpeed = 0;
      }
    }

    super.update(deltaTime);
  }
}
