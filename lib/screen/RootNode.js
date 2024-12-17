import GameObject from "../core/GameObject.js";
export default class RootNode extends GameObject {
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
//# sourceMappingURL=RootNode.js.map