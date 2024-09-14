import { Container } from "pixi.js";
import DisplayNode from "./DisplayNode.js";
export default class GameObject extends DisplayNode {
    constructor(x, y) {
        super(new Container({ x, y }));
    }
}
//# sourceMappingURL=GameObject.js.map