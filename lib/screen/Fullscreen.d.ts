import GameNode from "../core/GameNode.js";
import GameScreen from "./GameScreen.js";
interface FullscreenOptions {
    backgroundColor?: number;
}
export default class Fullscreen extends GameScreen {
    constructor(options: FullscreenOptions, ...gameNodes: (GameNode | undefined)[]);
}
export {};
//# sourceMappingURL=Fullscreen.d.ts.map