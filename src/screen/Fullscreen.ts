import GameNode from "../core/GameNode.js";
import GameScreen from "./GameScreen.js";

export default class Fullscreen extends GameScreen {
  constructor(...nodes: (GameNode | undefined)[]) {
    super(document.documentElement.clientWidth, window.innerHeight, ...nodes);
  }
}
