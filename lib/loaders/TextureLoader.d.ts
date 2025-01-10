import { Texture } from "pixi.js";
import ResourceLoader from "./ResourceLoader.js";
declare class TextureLoader extends ResourceLoader<Texture> {
    private createCanvasFromImage;
    private createTextureFromCanvas;
    protected loadResource(src: string): Promise<Texture | undefined>;
    protected cleanup(texture: Texture): void;
}
declare const _default: TextureLoader;
export default _default;
//# sourceMappingURL=TextureLoader.d.ts.map