import GameObject from "../core/GameObject.js";
export default class Layer extends GameObject {
    constructor() {
        super(0, 0);
    }
    getContainer() {
        return this.container;
    }
}
//# sourceMappingURL=Layer.js.map