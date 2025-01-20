import TransformableNode from "./TransformableNode.js";
export default class LayeredGameObject extends TransformableNode {
    constructor(x, y, layer, ...gameNodes) {
        super(x, y);
        this.append(...gameNodes);
    }
}
//# sourceMappingURL=LayeredGameObject.js.map