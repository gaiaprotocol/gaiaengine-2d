import { Texture } from "pixi.js";
declare class TextureLoader {
    private textureLoaded;
    private textureUsedCount;
    private loadPromises;
    private unloadPromises;
    private loadTexture;
    load(src: string): Promise<Texture | undefined>;
    private unload;
    release(src: string): void;
}
declare const _default: TextureLoader;
export default _default;
//# sourceMappingURL=TextureLoader.d.ts.map