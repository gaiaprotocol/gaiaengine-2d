import { StyleUtils } from "@commonmodule/app";
import Interval from "../delay/Interval.js";
import DomTextNode from "../text/DomTextNode.js";
export default class FPSDisplay extends DomTextNode {
    additionalX;
    additionalY;
    deltaTime = 0;
    constructor(additionalX = 0, additionalY = 0) {
        super(0, 0, "FPS: 0", {
            fontSize: "16px",
            color: "#000",
            textAlign: "right",
            width: "80px",
            height: "30px",
        });
        this.additionalX = additionalX;
        this.additionalY = additionalY;
        this.setPivot(54 - this.additionalX, -24 - this.additionalY);
        StyleUtils.applyTextStroke(this.domNode, 1, "#fff");
        new Interval(0.1, () => this.text = `FPS: ${Math.round(1 / this.deltaTime)}`).appendTo(this);
    }
    updatePosition() {
        if (this.screen) {
            this.scale = 1 / this.screen.camera.scale;
            this.setPosition(this.screen.camera.getX() +
                this.screen.width / 2 / this.screen.camera.scale, this.screen.camera.getY() -
                this.screen.height / 2 / this.screen.camera.scale);
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
        this.deltaTime = deltaTime;
        this.updatePosition();
        super.update(deltaTime);
    }
}
//# sourceMappingURL=FPSDisplay.js.map