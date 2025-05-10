import { AppRoot } from "@commonmodule/app";
import GameScreen from "./GameScreen.js";
import Letterbox from "./Letterbox.js";
export default class LetterboxedScreen extends GameScreen {
    letterboxes = {
        top: new Letterbox({ left: "0", top: "0", width: "100%" }),
        bottom: new Letterbox({ left: "0", bottom: "0", width: "100%" }),
        left: new Letterbox({ left: "0", top: "0", height: "100%" }),
        right: new Letterbox({ right: "0", top: "0", height: "100%" }),
    };
    constructor(options) {
        super(options);
        this
            .style({
            position: "fixed",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
        })
            .updateLayout()
            .appendTo(AppRoot);
        AppRoot.bind(this, "resize", () => this.updateLayout());
        this.append(...Object.values(this.letterboxes));
    }
    updateLayout() {
        const { clientWidth: winWidth, clientHeight: winHeight } = document.documentElement;
        const widthScale = winWidth / this.width;
        const heightScale = winHeight / this.height;
        this.scale = Math.min(widthScale, heightScale);
        this.resize(this.width, this.height, this.scale);
        const left = `${(winWidth - this.width * this.scale) / 2}px`;
        const top = `${(winHeight - this.height * this.scale) / 2}px`;
        this.style({ left, top });
        this.letterboxes.left.style({ width: left });
        this.letterboxes.top.style({ height: top });
        this.letterboxes.right.style({ width: left });
        this.letterboxes.bottom.style({ height: top });
        return this;
    }
}
//# sourceMappingURL=LetterboxedScreen.js.map