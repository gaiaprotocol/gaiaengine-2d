import Node from "../base/Node.js";
import Screen, { ScreenOptions } from "./Screen.js";
export default class LetterboxedScreen extends Screen {
    private letterboxes;
    constructor(width: number, height: number, ...nodes: (Node | ScreenOptions | undefined)[]);
    private windowResize;
    delete(): void;
}
//# sourceMappingURL=LetterboxedScreen.d.ts.map