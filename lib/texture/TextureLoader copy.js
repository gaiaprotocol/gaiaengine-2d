import { CanvasSource, Texture } from "pixi.js";
class TextureLoader {
    textures = new Map();
    textureUsedCount = new Map();
    loadPromises = new Map();
    checkTextureUsing(src) {
        return this.textureUsedCount.has(src) &&
            this.textureUsedCount.get(src) > 0;
    }
    async loadTexture(src) {
        const image = new Image();
        image.src = src;
        image.crossOrigin = "anonymous";
        const loadPromise = new Promise((resolve, reject) => {
            image.onload = () => {
                if (this.checkTextureUsing(src)) {
                    const canvas = document.createElement("canvas");
                    canvas.width = image.width;
                    canvas.height = image.height;
                    const context = canvas.getContext("2d");
                    if (!context)
                        reject(new Error("Failed to get 2d context"));
                    else {
                        context.drawImage(image, 0, 0);
                        const source = new CanvasSource({ resource: canvas });
                        const texture = new Texture({ source });
                        if (this.textures.has(src)) {
                            reject(new Error("Texture already exists"));
                        }
                        else {
                            this.textures.set(src, texture);
                            resolve(texture);
                        }
                    }
                    canvas.remove();
                }
                else {
                    resolve(undefined);
                }
                this.loadPromises.delete(src);
            };
            image.onerror = (error) => {
                reject(error);
                this.loadPromises.delete(src);
            };
        });
        this.loadPromises.set(src, loadPromise);
        return await loadPromise;
    }
    async load(src) {
        this.textureUsedCount.set(src, (this.textureUsedCount.get(src) || 0) + 1);
        if (this.textures.has(src))
            return this.textures.get(src);
        if (this.loadPromises.has(src))
            return await this.loadPromises.get(src);
        return await this.loadTexture(src);
    }
    release(src) {
        const count = this.textureUsedCount.get(src);
        if (count === undefined)
            throw new Error("Texture not found");
        if (count === 1) {
            this.textureUsedCount.delete(src);
            const texture = this.textures.get(src);
            if (texture) {
                texture.destroy();
                this.textures.delete(src);
            }
        }
        else {
            this.textureUsedCount.set(src, count - 1);
        }
    }
}
export default new TextureLoader();
//# sourceMappingURL=TextureLoader%20copy.js.map