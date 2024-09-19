import { BodyNode } from "@common-module/app";
import GameNode from "../core/GameNode.js";
import GameScreen from "./GameScreen.js";

export default class LetterboxedScreen extends GameScreen {
  constructor(
    width: number,
    height: number,
    ...gameNodes: (GameNode | undefined)[]
  ) {
    super(width, height, ...gameNodes);
    this.appendTo(BodyNode);
  }
}
