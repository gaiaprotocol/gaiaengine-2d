import GameObject from "../core/GameObject.js";
export default class Movable extends GameObject {
    speedX = 0;
    speedY = 0;
    minSpeedX = -Infinity;
    maxSpeedX = Infinity;
    minSpeedY = -Infinity;
    maxSpeedY = Infinity;
    accelX = 0;
    accelY = 0;
    move(radian, speed) {
        this.speedX = Math.cos(radian) * speed;
        this.speedY = Math.sin(radian) * speed;
    }
    stop() {
        this.speedX = 0;
        this.speedY = 0;
    }
    update(deltaTime) {
        this.speedX += this.accelX * deltaTime;
        this.speedY += this.accelY * deltaTime;
        if (this.speedX < this.minSpeedX)
            this.speedX = this.minSpeedX;
        if (this.speedX > this.maxSpeedX)
            this.speedX = this.maxSpeedX;
        if (this.speedY < this.minSpeedY)
            this.speedY = this.minSpeedY;
        if (this.speedY > this.maxSpeedY)
            this.speedY = this.maxSpeedY;
        this.x += this.speedX * deltaTime;
        this.y += this.speedY * deltaTime;
        super.update(deltaTime);
    }
}
//# sourceMappingURL=Movable.js.map