import Interval from "../delay/Interval.js";
import TextNode from "../dom/TextNode.js";
export default class FPSDisplay extends TextNode {
    deltaTime = 0;
    constructor() {
        super(0, 0, "FPS: 0");
        new Interval(0.1, () => this.text = `FPS: ${Math.round(1 / this.deltaTime)}`).appendTo(this);
    }
    updatePosition() {
        if (this.screen) {
            this.x = this.screen.width / 2 - 60;
            this.y = 30 - this.screen.height / 2;
        }
    }
    set screen(screen) {
        super.screen = screen;
        this.updatePosition();
    }
    get screen() {
        return super.screen;
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.deltaTime = deltaTime;
        this.updatePosition();
    }
}
//# sourceMappingURL=FPSDisplay.js.map