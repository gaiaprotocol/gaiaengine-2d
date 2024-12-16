export default class Camera {
    screen;
    _x = 0;
    _y = 0;
    _scale = 1;
    constructor(screen) {
        this.screen = screen;
    }
    getX() {
        return this._x;
    }
    getY() {
        return this._y;
    }
    setPosition(x, y) {
        this._x = x;
        this._y = y;
        this.screen.updateRootNodePosition();
    }
    set scale(value) {
        this._scale = value;
        this.screen.updateRootNodePosition();
    }
    get scale() {
        return this._scale;
    }
}
//# sourceMappingURL=Camera.js.map