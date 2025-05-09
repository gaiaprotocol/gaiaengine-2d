import { AppRoot } from "@commonmodule/app";
import GameScreen from "./GameScreen.js";
export default class Fullscreen extends GameScreen {
    constructor(options) {
        super({
            width: document.documentElement.clientWidth,
            height: window.innerHeight,
            ...options,
        });
        this
            .style({
            position: "fixed",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
        })
            .appendTo(AppRoot);
        AppRoot.bind("resize", this, () => this.resize(document.documentElement.clientWidth, window.innerHeight));
    }
}
//# sourceMappingURL=Fullscreen.js.map