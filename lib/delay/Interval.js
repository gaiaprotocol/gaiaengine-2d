import GameNode from "../core/GameNode.js";
export default class Interval extends GameNode {
    intervalDuration;
    callback;
    startImmediately;
    accumulatedTime = 0;
    constructor(intervalDuration, callback, startImmediately = false) {
        super();
        this.intervalDuration = intervalDuration;
        this.callback = callback;
        this.startImmediately = startImmediately;
        if (this.intervalDuration <= 0) {
            throw new Error("Interval duration must be greater than zero.");
        }
        if (this.startImmediately) {
            this.accumulatedTime = this.intervalDuration;
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