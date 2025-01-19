import GameNode from "../core/GameNode.js";

export default class Delay extends GameNode {
  private accumulatedTime = 0;

  constructor(
    private readonly delayDuration: number,
    private readonly callback: () => void,
  ) {
    super();
    if (this.delayDuration <= 0) {
      throw new Error("Delay duration must be greater than zero.");
    }
  }

  protected update(deltaTime: number) {
    super.update(deltaTime);

    this.accumulatedTime += deltaTime;
    if (this.accumulatedTime >= this.delayDuration) {
      this.callback();
      this.remove();
    }
  }
}
