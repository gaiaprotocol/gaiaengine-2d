import GameObject from "../core/GameObject.js";
export default class Scene extends GameObject {
    bgm;
    constructor() {
        super(0, 0);
    }
    transitionTo(Scene) {
        if (this.parent)
            new Scene().appendTo(this.parent);
        this.remove();
    }
    remove() {
        if (this.bgm)
            this.bgm.remove();
        super.remove();
    }
}
//# sourceMappingURL=Scene.js.map