import { BodyNode } from "@common-module/app";
import Screen from "./Screen.js";
export default class Fullscreen extends Screen {
    constructor(...nodes) {
        super(0, 0, ...nodes);
        this.style({
            position: "fixed",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
        });
        this.windowResize();
        window.addEventListener("resize", this.windowResize);
        BodyNode.append(this);
    }
    windowResize = () => {
        this.resize(document.documentElement.clientWidth, window.innerHeight, 1);
    };
    delete() {
        window.removeEventListener("resize", this.windowResize);
        super.delete();
    }
}
//# sourceMappingURL=Fullscreen.js.map