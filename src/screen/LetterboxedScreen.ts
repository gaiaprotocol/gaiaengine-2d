import { BodyNode } from "@common-module/app";
import GameScreen from "./GameScreen.js";
import Letterbox from "./Letterbox.js";

interface LetterboxedScreenOptions {
  width: number;
  height: number;
  backgroundColor?: number;
  layers?: { name: string; drawingOrder: number }[];
}

export default class LetterboxedScreen extends GameScreen {
  private letterboxes = {
    top: new Letterbox({ left: "0", top: "0", width: "100%" }),
    bottom: new Letterbox({ left: "0", bottom: "0", width: "100%" }),
    left: new Letterbox({ left: "0", top: "0", height: "100%" }),
    right: new Letterbox({ right: "0", top: "0", height: "100%" }),
  };

  constructor(options: LetterboxedScreenOptions) {
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
      .onWindow("resize", this.updateLayout)
      .appendTo(BodyNode);
  }

  private updateLayout() {
    const { clientWidth: winWidth, clientHeight: winHeight } =
      document.documentElement;

    const widthRatio = winWidth / this.width;
    const heightRatio = winHeight / this.height;
    this.ratio = Math.min(widthRatio, heightRatio);

    this.resize(this.width, this.height, this.ratio);

    const left = `${(winWidth - this.width * this.ratio) / 2}px`;
    const top = `${(winHeight - this.height * this.ratio) / 2}px`;

    this.style({ left, top });

    this.letterboxes.left.style({ width: left });
    this.letterboxes.top.style({ height: top });
    this.letterboxes.right.style({ width: left });
    this.letterboxes.bottom.style({ height: top });

    return this;
  }
}
