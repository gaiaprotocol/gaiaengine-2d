import { BitmapText } from "pixi.js";
import DisplayNode from "../core/DisplayNode.js";
export default class BitmapTextNode extends DisplayNode {
    constructor(x, y, text) {
        super(new BitmapText({ x, y, text }));
    }
}
//# sourceMappingURL=BitmapTextNode.js.map