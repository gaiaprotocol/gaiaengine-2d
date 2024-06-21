export default class Camera {
    screen;
    x = 0;
    y = 0;
    constructor(screen) {
        this.screen = screen;
    }
    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.screen.updateRootPosition();
    }
}
//# sourceMappingURL=Camera.js.map