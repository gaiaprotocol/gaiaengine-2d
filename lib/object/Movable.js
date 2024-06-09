import Node from "../Node.js";
export default class Movable extends Node {
    options;
    constructor(x, y, options) {
        super(x, y);
        this.options = options;
    }
    step(deltaTime) {
        if (this.options?.speedX) {
            this.container.x += this.options.speedX * deltaTime;
        }
        super.step(deltaTime);
    }
}
//# sourceMappingURL=Movable.js.map