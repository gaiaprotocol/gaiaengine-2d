import GameScreen from "./GameScreen.js";

export default class Fullscreen extends GameScreen {
  constructor() {
    super(document.documentElement.clientWidth, window.innerHeight);
  }
}
