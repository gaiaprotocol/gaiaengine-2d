import GameScreen from "./GameScreen.js";
interface FullscreenOptions {
    backgroundColor?: number;
    layers?: {
        name: string;
        drawingOrder: number;
    }[];
}
export default class Fullscreen extends GameScreen {
    constructor(options?: FullscreenOptions);
}
export {};
//# sourceMappingURL=Fullscreen.d.ts.map