import { Container } from "pixi.js";
import DisplayNode from "./DisplayNode.js";
export default class GameObject extends DisplayNode {
    constructor(x, y, ...gameNodes) {
        super(new Container({ x, y }));
        this.append(...gameNodes);
    }
}
//# sourceMappingURL=GameObject.js.map