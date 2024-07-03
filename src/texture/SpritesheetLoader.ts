import { Spritesheet, SpritesheetData } from "pixi.js";
import TextureLoader from "./TextureLoader.js";

class SpritesheetLoader {
  private sheets: Map<string, Spritesheet> = new Map();
  private sheetUsedCount: Map<string, number> = new Map();
  private loadPromises: Map<string, Promise<Spritesheet | undefined>> =
    new Map();

  private checkSheetUsing(src: string): boolean {
    return this.sheetUsedCount.has(src) && this.sheetUsedCount.get(src)! > 0;
  }

  private async loadSheet(
    src: string,
    atlas: SpritesheetData,
  ): Promise<Spritesheet | undefined> {
    const loadPromise = (async () => {
      const texture = await TextureLoader.load(src);
      if (!texture) throw new Error(`Failed to load texture: ${src}`);

      const sheet = new Spritesheet(texture, atlas);
      await sheet.parse();

      this.loadPromises.delete(src);

      if (this.checkSheetUsing(src)) {
        if (this.sheets.has(src)) {
          TextureLoader.release(src);
          throw new Error("Sheet already exists");
        } else {
          this.sheets.set(src, sheet);
          return sheet;
        }
      } else {
        TextureLoader.release(src);
        return undefined;
      }
    })();
    this.loadPromises.set(src, loadPromise);
    return await loadPromise;
  }

  public async load(
    src: string,
    atlas: SpritesheetData,
  ): Promise<Spritesheet | undefined> {
    this.sheetUsedCount.set(src, (this.sheetUsedCount.get(src) || 0) + 1);
    if (this.sheets.has(src)) return this.sheets.get(src)!;
    if (this.loadPromises.has(src)) return await this.loadPromises.get(src)!;
    return await this.loadSheet(src, atlas);
  }

  public release(src: string): void {
    const count = this.sheetUsedCount.get(src);
    if (count === undefined) throw new Error("Texture not found");

    if (count === 1) {
      this.sheetUsedCount.delete(src);
      const sheet = this.sheets.get(src);
      if (sheet) {
        sheet.destroy();
        this.sheets.delete(src);
        TextureLoader.release(src);
      }
    } else {
      this.sheetUsedCount.set(src, count - 1);
    }
  }
}

export default new SpritesheetLoader();
