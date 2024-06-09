import GameNode from "../GameNode.js";
export default class Movable extends GameNode {
    options;
    constructor(container, options) {
        super(container);
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