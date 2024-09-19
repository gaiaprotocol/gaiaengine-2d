import { BodyNode } from "@common-module/app";
import GameScreen from "./GameScreen.js";
export default class LetterboxedScreen extends GameScreen {
    constructor(width, height, ...gameNodes) {
        super(width, height, ...gameNodes);
        this.appendTo(BodyNode);
    }
}
//# sourceMappingURL=LetterboxedScreen.js.map