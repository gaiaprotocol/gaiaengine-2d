import { el, StyleUtils } from "@commonmodule/app";
import GameObject from "../core/GameObject.js";
import Interval from "../delay/Interval.js";
import DebugManager from "./DebugManager.js";
export default class DebugDisplay extends GameObject {
    deltaTime = 0;
    textNode;
    constructor() {
        super(0, 0);
        this.textNode = el("", "FPS: 0, Node: 0", {
            style: {
                position: "absolute",
                right: "16px",
                top: "10px",
                fontSize: "16px",
                color: "#000",
            },
        });
        StyleUtils.applyTextStroke(this.textNode, 1, "#fff");
        new Interval(0.1, () => this.textNode.text = `FPS: ${Math.round(1 / this.deltaTime)}, Node: ${DebugManager.displayNodeCount}`).appendTo(this);
    }
    set screen(screen) {
        super.screen = screen;
        if (screen)
            this.textNode.appendTo(screen);
    }
    get screen() {
        return super.screen;
    }
    update(deltaTime) {
        this.deltaTime = deltaTime;
        super.update(deltaTime);
    }
    remove() {
        this.textNode.remove();
        super.remove();
    }
}
//# sourceMappingURL=DebugDisplay.js.map