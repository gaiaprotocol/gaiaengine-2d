import GameNode from "../core/GameNode.js";

export default class Interval extends GameNode {
  private accumulatedTime = 0;

  constructor(
    private readonly intervalDuration: number,
    private readonly callback: () => void,
    private readonly startImmediately: boolean = false,
  ) {
    super();
    if (this.intervalDuration <= 0) {
      throw new Error("Interval duration must be greater than zero.");
    }
    if (this.startImmediately) {
      this.accumulatedTime = this.intervalDuration;
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
