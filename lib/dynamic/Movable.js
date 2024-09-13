import GameObject from "../core/GameObject.js";
export default class Movable extends GameObject {
    speedX = 0;
    update(deltaTime) {
        this.x += this.speedX * deltaTime;
        super.update(deltaTime);
    }
}
//# sourceMappingURL=Movable.js.map