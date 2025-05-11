import GameScreen from "./GameScreen.js";
interface BaseLetterboxedScreenOptions {
    backgroundColor?: number;
    layers?: {
        name: string;
        drawingOrder: number;
    }[];
}
type LetterboxedScreenOptions = ({
    width: number;
    height: number;
} & BaseLetterboxedScreenOptions) | ({
    maxWidth: number;
    height: number;
} & BaseLetterboxedScreenOptions) | ({
    width: number;
    maxHeight: number;
} & BaseLetterboxedScreenOptions);
export default class LetterboxedScreen extends GameScreen {
    private readonly maxWidth?;
    private readonly maxHeight?;
    private letterboxes;
    constructor(options: LetterboxedScreenOptions);
    private updateLayout;
}
export {};
//# sourceMappingURL=LetterboxedScreen.d.ts.map