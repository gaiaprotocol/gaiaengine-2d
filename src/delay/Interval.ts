import Entity from "../base/Entity.js";

export default class Interval extends Entity {
  private elapsedTime = 0;

  constructor(private ms: number, private onInterval: () => void) {
    super();
  }

  public step(deltaTime: number) {
    this.elapsedTime += deltaTime;
    if (this.elapsedTime >= this.ms) {
      this.elapsedTime %= this.ms;
      this.onInterval();
    }
    super.step(deltaTime);
  }
}
