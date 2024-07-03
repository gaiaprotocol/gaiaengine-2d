import { Spritesheet, SpritesheetData } from "pixi.js";
declare class SpritesheetLoader {
    private sheets;
    private sheetUsedCount;
    private loadPromises;
    private checkSheetUsing;
    private loadSheet;
    load(src: string, atlas: SpritesheetData): Promise<Spritesheet | undefined>;
    release(src: string): void;
}
declare const _default: SpritesheetLoader;
export default _default;
//# sourceMappingURL=SpritesheetLoader.d.ts.map