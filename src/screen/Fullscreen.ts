import { BodyNode } from "@common-module/app";
import GameScreen from "./GameScreen.js";

interface FullscreenOptions {
  backgroundColor?: number;
  layers?: { name: string; drawingOrder: number }[];
}

export default class Fullscreen extends GameScreen {
  constructor(options?: FullscreenOptions) {
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
      .appendTo(BodyNode);

    this.onWindow(
      "resize",
      () =>
        this.resize(document.documentElement.clientWidth, window.innerHeight),
    );
  }
}
