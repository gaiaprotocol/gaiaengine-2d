import GameObject from "../core/GameObject.js";
export default class Movable extends GameObject {
    speedX = 0;
    speedY = 0;
    move(angle, speed) {
        this.speedX = Math.cos(angle) * speed;
        this.speedY = Math.sin(angle) * speed;
    }
    stop() {
        this.speedX = 0;
        this.speedY = 0;
    }
    update(deltaTime) {
        this.x += this.speedX * deltaTime;
        this.y += this.speedY * deltaTime;
        super.update(deltaTime);
    }
}
//# sourceMappingURL=Movable.js.map