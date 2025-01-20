import { Text } from "pixi.js";
import DisplayNode from "./core/DisplayNode.js";
export default class TextNode extends DisplayNode {
    constructor(x, y, text) {
        super(new Text({ x, y, text }));
    }
}
//# sourceMappingURL=TextNode.js.map