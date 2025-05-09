import { el, StyleUtils } from "@commonmodule/app";
import GameObject from "../core/GameObject.js";
import Interval from "../delay/Interval.js";
import DebugManager from "./DebugManager.js";
export default class DebugDisplay extends GameObject {
    deltaTime = 0;
    textDom;
    constructor() {
        super(0, 0);
        this.textDom = el("", "FPS: 0, Node: 0", {
            style: {
                position: "absolute",
                right: "16px",
                top: "10px",
                fontSize: "16px",
                color: "#000",
            },
        });
        StyleUtils.applyTextStroke(this.textDom, 1, "#fff");
        new Interval(0.1, () => this.textDom.text = `FPS: ${Math.round(1 / this.deltaTime)}, Node: ${DebugManager.displayNodeCount}`).appendTo(this);
    }
    set screen(screen) {
        super.screen = screen;
        if (screen)
            this.textDom.appendTo(screen);
    }
    get screen() {
        return super.screen;
    }
    update(deltaTime) {
        this.deltaTime = deltaTime;
        super.update(deltaTime);
    }
    remove() {
        this.textDom.remove();
        super.remove();
    }
}
//# sourceMappingURL=DebugDisplay.js.map