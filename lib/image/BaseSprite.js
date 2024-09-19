import GameObject from "../core/GameObject.js";
export default class BaseSprite extends GameObject {
    _src;
    set src(src) {
        if (this._src === src)
            return;
        if (this._src)
            this.releaseTexture(this._src);
        this._src = src;
        this.loadTexture(src);
    }
    get src() {
        return this._src ?? "";
    }
    remove() {
        if (this._src)
            this.releaseTexture(this._src);
        super.remove();
    }
}
//# sourceMappingURL=BaseSprite.js.map