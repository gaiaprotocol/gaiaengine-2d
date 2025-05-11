import { AppRoot } from "@commonmodule/app";
import GameScreen from "./GameScreen.js";
import Letterbox from "./Letterbox.js";
export default class LetterboxedScreen extends GameScreen {
    maxWidth;
    maxHeight;
    letterboxes = {
        top: new Letterbox({ left: "0", top: "0", width: "100%" }),
        bottom: new Letterbox({ left: "0", bottom: "0", width: "100%" }),
        left: new Letterbox({ left: "0", top: "0", height: "100%" }),
        right: new Letterbox({ right: "0", top: "0", height: "100%" }),
    };
    constructor(options) {
        const { width, height, maxWidth, maxHeight, ...rest } = options;
        const designWidth = width ?? maxWidth;
        const designHeight = height ?? maxHeight;
        super({ ...rest, width: designWidth, height: designHeight });
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
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
        const targetWidth = this.maxWidth !== undefined
            ? Math.min(this.maxWidth, winWidth)
            : this.width;
        const targetHeight = this.maxHeight !== undefined
            ? Math.min(this.maxHeight, winHeight)
            : this.height;
        const widthScale = winWidth / targetWidth;
        const heightScale = winHeight / targetHeight;
        this.scale = Math.min(widthScale, heightScale);
        this.resize(targetWidth, targetHeight, this.scale);
        const left = `${(winWidth - targetWidth * this.scale) / 2}px`;
        const top = `${(winHeight - targetHeight * this.scale) / 2}px`;
        this.style({ left, top });
        this.letterboxes.left.style({ width: left });
        this.letterboxes.top.style({ height: top });
        this.letterboxes.right.style({ width: left });
        this.letterboxes.bottom.style({ height: top });
        return this;
    }
}
//# sourceMappingURL=LetterboxedScreen.js.map