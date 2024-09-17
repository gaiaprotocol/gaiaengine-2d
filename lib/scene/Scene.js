import GameObject from "../core/GameObject.js";
export default class Scene extends GameObject {
    bgm;
    remove() {
        if (this.bgm)
            this.bgm.remove();
        super.remove();
    }
}
//# sourceMappingURL=Scene.js.map