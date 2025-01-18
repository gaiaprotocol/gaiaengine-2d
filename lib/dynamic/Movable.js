import GameObject from "../core/GameObject.js";
export default class Movable extends GameObject {
    minX = -Infinity;
    maxX = Infinity;
    minY = -Infinity;
    maxY = Infinity;
    speedX = 0;
    speedY = 0;
    accelX = 0;
    accelY = 0;
    minSpeedX = -Infinity;
    maxSpeedX = Infinity;
    minSpeedY = -Infinity;
    maxSpeedY = Infinity;
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
        if (this.x < this.minX)
            this.x = this.minX;
        if (this.x > this.maxX)
            this.x = this.maxX;
        if (this.y < this.minY)
            this.y = this.minY;
        if (this.y > this.maxY)
            this.y = this.maxY;
        super.update(deltaTime);
    }
}
//# sourceMappingURL=Movable.js.map