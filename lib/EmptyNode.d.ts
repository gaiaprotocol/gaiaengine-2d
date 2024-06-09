import { Container } from "pixi.js";
import Node from "./Node.js";
export default class EmptyNode extends Node<Container> {
    constructor(x: number, y: number);
    set container(container: Container);
    get container(): Container;
}
//# sourceMappingURL=EmptyNode.d.ts.map