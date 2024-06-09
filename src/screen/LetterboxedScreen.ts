import { BodyNode, DomNode, Style } from "@common-module/app";
import GameNode from "../GameNode.js";
import Screen from "./Screen.js";

class Letterbox extends DomNode {
  constructor(style: Style) {
    super();
    this.style({
      position: "absolute",
      zIndex: 9999998,
      backgroundColor: "#000000",
      ...style,
    });
  }
}

export default class LetterboxedScreen extends Screen {
  private letterboxes = {
    top: new Letterbox({ left: 0, top: 0, width: "100%" }).appendTo(this),
    bottom: new Letterbox({ left: 0, bottom: 0, width: "100%" }).appendTo(this),
    left: new Letterbox({ left: 0, top: 0, height: "100%" }).appendTo(this),
    right: new Letterbox({ right: 0, top: 0, height: "100%" }).appendTo(this),
  };

  constructor(width: number, height: number, ...nodes: GameNode[]) {
    super(...nodes);

    this.style({
      position: "fixed",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
    });

    window.addEventListener("resize", this.resize);
    BodyNode.append(this);
  }

  private resize = () => {
    //TODO:
  };

  public delete() {
    window.removeEventListener("resize", this.resize);
    super.delete();
  }
}
