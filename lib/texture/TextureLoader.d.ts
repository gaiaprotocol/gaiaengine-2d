import { Texture } from "pixi.js";
declare class TextureLoader {
    private textureUsedCount;
    load(src: string): Promise<Texture>;
    release(src: string): Promise<void>;
}
declare const _default: TextureLoader;
export default _default;
//# sourceMappingURL=TextureLoader.d.ts.map