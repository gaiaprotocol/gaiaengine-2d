import { Assets } from "pixi.js";
class TextureLoader {
    textureUsedCount = {};
    unloadPromises = {};
    async load(src) {
        if (this.textureUsedCount[src] === undefined) {
            this.textureUsedCount[src] = 0;
        }
        this.textureUsedCount[src]++;
        if (this.unloadPromises[src] !== undefined)
            await this.unloadPromises[src];
        const texture = await Assets.load(src);
        if (this.textureUsedCount[src] === undefined)
            this.unload(src);
        else
            return texture;
    }
    async unload(src) {
        if (this.unloadPromises[src] !== undefined)
            return;
        this.unloadPromises[src] = Assets.unload(src);
        await this.unloadPromises[src];
        delete this.unloadPromises[src];
    }
    release(src) {
        this.textureUsedCount[src]--;
        if (this.textureUsedCount[src] === 0) {
            delete this.textureUsedCount[src];
            this.unload(src);
        }
    }
}
export default new TextureLoader();
//# sourceMappingURL=TextureLoader.js.map