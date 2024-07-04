export default class Camera {
    screen;
    x = 0;
    y = 0;
    _scale = 1;
    constructor(screen) {
        this.screen = screen;
    }
    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.screen.updateRootPosition();
    }
    set scale(value) {
        this._scale = value;
        this.screen.updateRootPosition();
    }
    get scale() {
        return this._scale;
    }
}
//# sourceMappingURL=Camera.js.map