import WindowEventNode from "../core/WindowEventNode.js";
export default class Joystick extends WindowEventNode {
    options;
    codesPressed = new Set();
    arrowCodesPressed = new Set();
    constructor(options) {
        super();
        this.options = options;
        this.onWindow("keydown", (event) => {
            const code = event.code;
            if (this.codesPressed.has(code))
                return;
            this.codesPressed.add(code);
            this.options.onKeydown?.(code);
            if (code === "ArrowUp" ||
                code === "ArrowDown" ||
                code === "ArrowLeft" ||
                code === "ArrowRight") {
                this.arrowCodesPressed.add(code);
                this.calculateRadian();
            }
        }).onWindow("keyup", (event) => {
            const code = event.code;
            this.codesPressed.delete(code);
            if (code === "ArrowUp" ||
                code === "ArrowDown" ||
                code === "ArrowLeft" ||
                code === "ArrowRight") {
                this.arrowCodesPressed.delete(code);
                if (this.arrowCodesPressed.size === 0) {
                    this.options.onRelease();
                }
                else {
                    this.calculateRadian();
                }
            }
        }).onWindow("blur", () => {
            this.arrowCodesPressed.clear();
            this.options.onRelease();
        });
    }
    calculateRadian() {
        let dx = 0;
        let dy = 0;
        if (this.arrowCodesPressed.has("ArrowUp"))
            dy -= 1;
        if (this.arrowCodesPressed.has("ArrowDown"))
            dy += 1;
        if (this.arrowCodesPressed.has("ArrowLeft"))
            dx -= 1;
        if (this.arrowCodesPressed.has("ArrowRight"))
            dx += 1;
        if (dx !== 0 || dy !== 0) {
            const radian = Math.atan2(dy, dx);
            this.options.onMove(radian);
        }
    }
}
//# sourceMappingURL=Joystick.js.map