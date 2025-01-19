import WindowEventNode from "../core/WindowEventNode.js";
export default class Joystick extends WindowEventNode {
    onMove;
    onRelease;
    keysPressed = new Set();
    constructor(onMove, onRelease) {
        super();
        this.onMove = onMove;
        this.onRelease = onRelease;
        this.onWindow("keydown", (event) => {
            const key = event.key;
            if (key === "ArrowUp" ||
                key === "ArrowDown" ||
                key === "ArrowLeft" ||
                key === "ArrowRight") {
                if (this.keysPressed.has(key))
                    return;
                this.keysPressed.add(key);
                this.calculateRadian();
            }
        }).onWindow("keyup", (event) => {
            const key = event.key;
            if (key === "ArrowUp" ||
                key === "ArrowDown" ||
                key === "ArrowLeft" ||
                key === "ArrowRight") {
                this.keysPressed.delete(key);
                if (this.keysPressed.size === 0) {
                    this.onRelease();
                }
                else {
                    this.calculateRadian();
                }
            }
        }).onWindow("blur", () => {
            this.keysPressed.clear();
            this.onRelease();
        });
    }
    calculateRadian() {
        let dx = 0;
        let dy = 0;
        if (this.keysPressed.has("ArrowUp"))
            dy -= 1;
        if (this.keysPressed.has("ArrowDown"))
            dy += 1;
        if (this.keysPressed.has("ArrowLeft"))
            dx -= 1;
        if (this.keysPressed.has("ArrowRight"))
            dx += 1;
        if (dx !== 0 || dy !== 0) {
            const radian = Math.atan2(dy, dx);
            this.onMove(radian);
        }
    }
}
//# sourceMappingURL=Joystick.js.map