import GameObject from "../core/GameObject.js";
export default class SuperRootNode extends GameObject {
    constructor() {
        super(0, 0);
        this.globalTransform = this.transform;
    }
    setScreen(screen) {
        this.screen = screen;
        return this;
    }
    getContainer() {
        return this.container;
    }
    update(deltaTime) {
        super.update(deltaTime);
    }
}
//# sourceMappingURL=SuperRootNode%20copy.js.map