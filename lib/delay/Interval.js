import GameNode from "../core/GameNode.js";
export default class Interval extends GameNode {
    intervalDuration;
    callback;
    accumulatedTime = 0;
    constructor(intervalDuration, callback) {
        super();
        this.intervalDuration = intervalDuration;
        this.callback = callback;
        if (this.intervalDuration <= 0) {
            throw new Error("Interval duration must be greater than zero.");
        }
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.accumulatedTime += deltaTime;
        if (this.accumulatedTime >= this.intervalDuration) {
            this.accumulatedTime %= this.intervalDuration;
            this.callback();
        }
    }
}
//# sourceMappingURL=Interval.js.map