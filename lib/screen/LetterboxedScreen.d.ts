import GameScreen from "./GameScreen.js";
interface LetterboxedScreenOptions {
    width: number;
    height: number;
    backgroundColor?: number;
}
export default class LetterboxedScreen extends GameScreen {
    private letterboxes;
    constructor(options: LetterboxedScreenOptions);
    private updateLayout;
}
export {};
//# sourceMappingURL=LetterboxedScreen.d.ts.map