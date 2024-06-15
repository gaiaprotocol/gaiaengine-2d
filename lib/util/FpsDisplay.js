import { StyleUtil } from "@common-module/app";
import Interval from "../delay/Interval.js";
import Text from "../dom/Text.js";
export default class FpsDisplay extends Text {
    deltaTime = 0;
    constructor() {
        super(0, 0, "FPS: 0", {
            fontSize: 25,
            color: "#000",
        });
        StyleUtil.applyTextStroke(this.domNode, 2, "#fff");
        this.append(new Interval(0.1, () => this.text = `FPS: ${Math.round(1 / this.deltaTime)}`));
    }
    set screen(screen) {
        super.screen = screen;
        if (screen) {
            this.x = screen.width / 2 - 60;
            this.y = 30 - screen.height / 2;
        }
    }
    get screen() {
        return super.screen;
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.deltaTime = deltaTime;
    }
}
//# sourceMappingURL=FpsDisplay.js.map