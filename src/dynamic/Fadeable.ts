import { EventRecord } from "@commonmodule/ts";
import GameObject from "../core/GameObject.js";

export default class Fadeable<E extends EventRecord = EventRecord>
  extends GameObject<E> {
  protected fadingSpeed = 0;

  protected minFadingSpeed = -Infinity;
  protected maxFadingSpeed = Infinity;

  protected fadingAccel = 0;

  private fadeInCallback?: () => void;
  private fadeOutCallback?: () => void;

  public fadeIn(duration: number, callback?: () => void): void {
    this.alpha = 0;
    this.fadingSpeed = 1 / duration;
    this.fadeInCallback = callback;
  }

  public fadeOut(duration: number, callback?: () => void): void {
    this.alpha = 1;
    this.fadingSpeed = -1 / duration;
    this.fadeOutCallback = callback;
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
        this.fadeOutCallback?.();
      }

      if (this.alpha > 1) {
        this.alpha = 1;
        this.fadingSpeed = 0;
        this.fadeInCallback?.();
      }
    }

    super.update(deltaTime);
  }
}
