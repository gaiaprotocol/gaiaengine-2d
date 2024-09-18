import GameNode from "../core/GameNode.js";

export default class Interval extends GameNode {
  private accumulatedTime = 0;

  constructor(
    private readonly intervalDuration: number,
    private readonly callback: () => void,
  ) {
    super();
    if (this.intervalDuration <= 0) {
      throw new Error("Interval duration must be greater than zero.");
    }
  }

  protected update(deltaTime: number) {
    super.update(deltaTime);

    this.accumulatedTime += deltaTime;
    if (this.accumulatedTime >= this.intervalDuration) {
      this.accumulatedTime %= this.intervalDuration;
      this.callback();
    }
  }
}
