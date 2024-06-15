import { Assets } from "pixi.js";
class TextureLoader {
    textureLoaded = {};
    textureUsedCount = {};
    loadPromises = {};
    unloadPromises = {};
    async loadTexture(src) {
        const texture = await Assets.load(src);
        this.textureLoaded[src] = true;
        return texture;
    }
    async load(src) {
        if (this.textureUsedCount[src] === undefined) {
            this.textureUsedCount[src] = 0;
        }
        this.textureUsedCount[src]++;
        if (this.unloadPromises[src] !== undefined) {
            await this.unloadPromises[src];
        }
        if (this.textureUsedCount[src] > 0) {
            if (this.loadPromises[src] === undefined) {
                this.loadPromises[src] = this.loadTexture(src);
            }
            const texture = await this.loadPromises[src];
            delete this.loadPromises[src];
            if (this.textureUsedCount[src] > 0)
                return texture;
            else
                this.unload(src);
        }
        else
            this.unload(src);
    }
    async unload(src) {
        if (!this.textureLoaded[src] ||
            this.unloadPromises[src] !== undefined)
            return;
        this.unloadPromises[src] = Assets.unload(src);
        await this.unloadPromises[src];
        delete this.unloadPromises[src];
        delete this.textureLoaded[src];
    }
    release(src) {
        if (this.textureUsedCount[src] === undefined) {
            throw new Error("Texture not loaded");
        }
        this.textureUsedCount[src]--;
        if (this.textureUsedCount[src] === 0) {
            delete this.textureUsedCount[src];
            this.unload(src);
        }
    }
}
export default new TextureLoader();
//# sourceMappingURL=TextureLoader.js.map