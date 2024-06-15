import Collidable from "../collision/Collidable.js";
export default class Movable extends Collidable {
    minX = -Infinity;
    maxX = Infinity;
    _speedX = 0;
    accelX = 0;
    toSpeedX;
    set speedX(speedX) {
        this._speedX = speedX;
        this.accelX = 0;
        this.toSpeedX = undefined;
    }
    get speedX() {
        return this._speedX;
    }
    mixY = -Infinity;
    maxY = Infinity;
    _speedY = 0;
    accelY = 0;
    toSpeedY;
    set speedY(speedY) {
        this._speedY = speedY;
        this.accelY = 0;
        this.toSpeedY = undefined;
    }
    get speedY() {
        return this._speedY;
    }
    onMinXReached;
    onMaxXReached;
    onMinYReached;
    onMaxYReached;
    update(deltaTime) {
        if (this.accelX !== 0) {
            this._speedX += this.accelX * deltaTime;
            if (this.toSpeedX !== undefined) {
                if (this.accelX > 0 && this._speedX > this.toSpeedX) {
                    this.accelX = 0;
                    this._speedX = this.toSpeedX;
                    this.toSpeedX = undefined;
                }
                else if (this.accelX < 0 && this._speedX < this.toSpeedX) {
                    this.accelX = 0;
                    this._speedX = this.toSpeedX;
                    this.toSpeedX = undefined;
                }
            }
        }
        if (this._speedX !== 0 &&
            (this._speedX > 0 || this.x !== this.minX) &&
            (this._speedX < 0 || this.x !== this.maxX)) {
            let x = this.container.x + this._speedX * deltaTime;
            if (x < this.minX) {
                x = this.minX;
                this._speedX = 0;
                if (this.onMinXReached) {
                    this.onMinXReached();
                    if (this.deleted)
                        return;
                }
            }
            else if (x > this.maxX) {
                x = this.maxX;
                this._speedX = 0;
                if (this.onMaxXReached) {
                    this.onMaxXReached();
                    if (this.deleted)
                        return;
                }
            }
            this.x = x;
        }
        if (this.accelY !== 0) {
            this._speedY += this.accelY * deltaTime;
            if (this.toSpeedY !== undefined) {
                if (this.accelY > 0 && this._speedY > this.toSpeedY) {
                    this.accelY = 0;
                    this._speedY = this.toSpeedY;
                    this.toSpeedY = undefined;
                }
                else if (this.accelY < 0 && this._speedY < this.toSpeedY) {
                    this.accelY = 0;
                    this._speedY = this.toSpeedY;
                    this.toSpeedY = undefined;
                }
            }
        }
        if (this._speedY !== 0 &&
            (this._speedY > 0 || this.y !== this.mixY) &&
            (this._speedY < 0 || this.y !== this.maxY)) {
            let y = this.container.y + this._speedY * deltaTime;
            if (y < this.mixY) {
                y = this.mixY;
                this._speedY = 0;
                if (this.onMinYReached) {
                    this.onMinYReached();
                    if (this.deleted)
                        return;
                }
            }
            else if (y > this.maxY) {
                y = this.maxY;
                this._speedY = 0;
                if (this.onMaxYReached) {
                    this.onMaxYReached();
                    if (this.deleted)
                        return;
                }
            }
            this.y = y;
        }
        super.update(deltaTime);
    }
}
//# sourceMappingURL=Movable.js.map