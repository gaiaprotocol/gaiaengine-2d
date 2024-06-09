import { Container } from "pixi.js";
import Node from "./Node.js";
export default class EmptyNode extends Node {
    constructor(x, y) {
        super(x, y);
        super.container = new Container();
    }
    set container(container) {
        super.container = container;
    }
    get container() {
        return super.container;
    }
}
//# sourceMappingURL=EmptyNode.js.map