import GameScreen from "./GameScreen.js";
export default class Fullscreen extends GameScreen {
    constructor(...nodes) {
        super(document.documentElement.clientWidth, window.innerHeight, ...nodes);
    }
}
//# sourceMappingURL=Fullscreen.js.map