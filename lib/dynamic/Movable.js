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
    targetX;
    targetY;
    onArrive;
    move(radian, speed) {
        this.speedX = Math.cos(radian) * speed;
        this.speedY = Math.sin(radian) * speed;
    }
    moveTo(x, y, speed, onArrive) {
        const dx = x - this.x;
        const dy = y - this.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 1e-6) {
            onArrive?.();
            return;
        }
        const radian = Math.atan2(dy, dx);
        this.move(radian, speed);
        this.targetX = x;
        this.targetY = y;
        this.onArrive = onArrive;
    }
    stop() {
        this.speedX = 0;
        this.speedY = 0;
        this.targetX = undefined;
        this.targetY = undefined;
        this.onArrive = undefined;
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
        if (this.targetX !== undefined && this.targetY !== undefined) {
            const toTargetX = this.targetX - this.x;
            const toTargetY = this.targetY - this.y;
            const distanceSq = toTargetX * toTargetX + toTargetY * toTargetY;
            const travelledSq = (this.speedX * deltaTime) ** 2 +
                (this.speedY * deltaTime) ** 2;
            if (distanceSq <= travelledSq || Math.hypot(toTargetX, toTargetY) < 1e-3) {
                this.x = this.targetX;
                this.y = this.targetY;
                this.onArrive?.();
                this.stop();
            }
        }
        super.update(deltaTime);
    }
}
//# sourceMappingURL=Movable.js.map