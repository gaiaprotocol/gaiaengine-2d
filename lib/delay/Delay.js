import GameNode from "../core/GameNode.js";
export default class Delay extends GameNode {
    delayDuration;
    callback;
    accumulatedTime = 0;
    constructor(delayDuration, callback) {
        super();
        this.delayDuration = delayDuration;
        this.callback = callback;
        if (this.delayDuration <= 0) {
            throw new Error("Delay duration must be greater than zero.");
        }
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.accumulatedTime += deltaTime;
        if (this.accumulatedTime >= this.delayDuration) {
            this.callback();
            this.remove();
        }
    }
}
//# sourceMappingURL=Delay.js.map