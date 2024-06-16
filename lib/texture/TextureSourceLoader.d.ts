import { Texture } from "pixi.js";
declare class TextureSourceLoader {
    private textures;
    private textureUsedCount;
    private loadPromises;
    private checkTextureUsing;
    private loadTexture;
    load(src: string): Promise<Texture | undefined>;
    release(src: string): void;
}
declare const _default: TextureSourceLoader;
export default _default;
//# sourceMappingURL=TextureSourceLoader.d.ts.map