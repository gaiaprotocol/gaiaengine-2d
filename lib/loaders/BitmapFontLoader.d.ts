import { ResourceLoader } from "@commonmodule/ts";
import BitmapFont from "../text/BitmapFont.js";
declare class BitmapFontLoader extends ResourceLoader<BitmapFont> {
    private fntToSrc;
    protected loadResource(fnt: string, src: string): Promise<BitmapFont | undefined>;
    protected cleanup(fnt: string): void;
}
declare const _default: BitmapFontLoader;
export default _default;
//# sourceMappingURL=BitmapFontLoader.d.ts.map