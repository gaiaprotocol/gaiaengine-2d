import GameObject from "../core/GameObject.js";
import TransitionOverlay from "./TransitionOverlay.js";
export default class Scene extends GameObject {
    bgm;
    constructor() {
        super(0, 0);
    }
    transitionTo(Scene) {
        if (this.screen) {
            new TransitionOverlay(() => {
                if (this.parent)
                    new Scene().appendTo(this.parent);
                this.remove();
            }).appendTo(this.screen);
        }
    }
    remove() {
        this.bgm?.remove();
        super.remove();
    }
}
//# sourceMappingURL=Scene.js.map