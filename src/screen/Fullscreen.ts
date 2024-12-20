import { BodyNode } from "@common-module/app";
import GameNode from "../core/GameNode.js";
import GameScreen from "./GameScreen.js";

interface FullscreenOptions {
  backgroundColor?: number;
}

export default class Fullscreen extends GameScreen {
  constructor(
    options: FullscreenOptions,
    ...gameNodes: (GameNode | undefined)[]
  ) {
    super({
      width: document.documentElement.clientWidth,
      height: window.innerHeight,
      ...options,
    }, ...gameNodes);

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
