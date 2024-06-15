import { Assets } from "pixi.js";
class TextureLoader {
    textureUsedCount = {};
    async load(src) {
        if (this.textureUsedCount[src] === undefined) {
            this.textureUsedCount[src] = 0;
        }
        this.textureUsedCount[src]++;
        return await Assets.load(src);
    }
    async release(src) {
        this.textureUsedCount[src]--;
        if (this.textureUsedCount[src] === 0) {
            delete this.textureUsedCount[src];
            Assets.unload(src);
        }
    }
}
export default new TextureLoader();
//# sourceMappingURL=TextureLoader.js.map