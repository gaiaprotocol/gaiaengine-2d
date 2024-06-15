import { BodyNode, DomNode, Style } from "@common-module/app";
import Node from "../base/Node.js";
import Screen from "./Screen.js";

class Letterbox extends DomNode {
  constructor(style: Style) {
    super();
    this.style({
      position: "fixed",
      zIndex: 9999998,
      backgroundColor: "#000000",
      ...style,
    });
    BodyNode.append(this);
  }
}

export default class LetterboxedScreen extends Screen {
  private letterboxes = {
    top: new Letterbox({ left: 0, top: 0, width: "100%" }),
    bottom: new Letterbox({ left: 0, bottom: 0, width: "100%" }),
    left: new Letterbox({ left: 0, top: 0, height: "100%" }),
    right: new Letterbox({ right: 0, top: 0, height: "100%" }),
  };

  constructor(width: number, height: number, ...nodes: (Node | undefined)[]) {
    super(width, height, ...nodes);

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

  private windowResize = () => {
    const winWidth = document.documentElement.clientWidth;
    const winHeight = window.innerHeight;

    const widthRatio = winWidth / this.width;
    const heightRatio = winHeight / this.height;
    this.ratio = widthRatio < heightRatio ? widthRatio : heightRatio;

    this.resize(this.width, this.height, this.ratio);

    const left = (winWidth - this.width * this.ratio) / 2;
    const top = (winHeight - this.height * this.ratio) / 2;

    this.style({ left, top });

    this.letterboxes.left.style({ width: left });
    this.letterboxes.top.style({ height: top });
    this.letterboxes.right.style({ width: left });
    this.letterboxes.bottom.style({ height: top });
  };

  public delete() {
    window.removeEventListener("resize", this.windowResize);
    super.delete();
  }
}
