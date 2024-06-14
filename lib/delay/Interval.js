import Entity from "../base/Entity.js";
export default class Interval extends Entity {
    ms;
    onInterval;
    elapsedTime = 0;
    constructor(ms, onInterval) {
        super();
        this.ms = ms;
        this.onInterval = onInterval;
    }
    update(deltaTime) {
        this.elapsedTime += deltaTime;
        if (this.elapsedTime >= this.ms) {
            this.elapsedTime %= this.ms;
            this.onInterval();
        }
    }
}
//# sourceMappingURL=Interval.js.map