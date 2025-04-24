import { DomNode, el, StyleUtils } from "@commonmodule/app";
import GameObject from "../core/GameObject.js";
import Interval from "../delay/Interval.js";
import GameScreen from "../screen/GameScreen.js";
import DebugManager from "./DebugManager.js";

export default class DebugDisplay extends GameObject {
  private deltaTime = 0;
  private textNode: DomNode;

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

    new Interval(
      0.1,
      () =>
        this.textNode.text = `FPS: ${
          Math.round(1 / this.deltaTime)
        }, Node: ${DebugManager.displayNodeCount}`,
    ).appendTo(this);
  }

  public set screen(screen: GameScreen | undefined) {
    super.screen = screen;
    if (screen) this.textNode.appendTo(screen);
  }

  public get screen() {
    return super.screen;
  }

  public update(deltaTime: number): void {
    this.deltaTime = deltaTime;
    super.update(deltaTime);
  }

  public remove(): void {
    this.textNode.remove();
    super.remove();
  }
}
