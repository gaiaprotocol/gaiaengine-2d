import { Container } from "pixi.js";
import GameNode from "./GameNode.js";
export default class GameObject extends GameNode {
    container;
    constructor(x, y) {
        super();
        this.container = new Container({ x, y });
    }
    append(...children) {
        for (const child of children) {
            if (child === undefined)
                continue;
            else if (child instanceof GameObject)
                child.appendTo(this);
        }
    }
    appendTo(parent, index) {
        index !== undefined
            ? parent.container.addChildAt(this.container, index)
            : parent.container.addChild(this.container);
    }
}
//# sourceMappingURL=GameObject.js.map