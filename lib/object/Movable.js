import Node from "../Node.js";
export default class Movable extends Node {
    minX = -Infinity;
    maxX = Infinity;
    speedX = 0;
    constructor(x, y) {
        super(x, y);
    }
    step(deltaTime) {
        if (this.speedX !== 0) {
            let x = this.container.x + this.speedX * deltaTime;
            if (x < this.minX)
                x = this.minX;
            else if (x > this.maxX)
                x = this.maxX;
            this.container.x = x;
        }
        super.step(deltaTime);
    }
}
//# sourceMappingURL=Movable.js.map