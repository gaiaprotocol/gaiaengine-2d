import { Container } from "pixi.js";
import TransformableNode from "./TransformableNode.js";
export default class LayeredGameObject extends TransformableNode {
    layer;
    container;
    constructor(x, y, layer, ...gameNodes) {
        super(x, y);
        this.layer = layer;
        this.container = new Container({ x, y });
        this.append(...gameNodes);
    }
    set screen(screen) {
        if (screen)
            screen.appendToLayer(this.container, this.layer);
        super.screen = screen;
    }
    get screen() {
        return super.screen;
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.container.x = this.globalTransform.x;
        this.container.y = this.globalTransform.y;
        this.container.scale.set(this.globalTransform.scaleX, this.globalTransform.scaleY);
        this.container.rotation = this.globalTransform.rotation;
        this.container.alpha = this.globalTransform.alpha;
    }
    remove() {
        this.container.destroy();
        super.remove();
    }
}
//# sourceMappingURL=LayeredGameObject.js.map