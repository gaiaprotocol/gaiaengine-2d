import { BodyNode } from "@common-module/app";
import Node from "../base/Node.js";
import Screen from "./Screen.js";

export default class Fullscreen extends Screen {
  constructor(...nodes: (Node | undefined)[]) {
    super(document.documentElement.clientWidth, window.innerHeight, ...nodes);

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
    this.resize(document.documentElement.clientWidth, window.innerHeight, 1);
  };

  public delete() {
    window.removeEventListener("resize", this.windowResize);
    super.delete();
  }
}
