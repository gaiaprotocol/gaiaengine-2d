import { Spritesheet, SpritesheetData } from "pixi.js";
import ResourceLoader from "./ResourceLoader.js";
import TextureLoader from "./TextureLoader.js";

class SpritesheetLoader extends ResourceLoader<Spritesheet> {
  protected async loadFromPath(
    src: string,
    atlas: SpritesheetData,
  ): Promise<Spritesheet | undefined> {
    const loadPromise = (async () => {
      const texture = await TextureLoader.load(src);
      if (!texture) throw new Error(`Failed to load texture: ${src}`);

      const spritesheet = new Spritesheet(texture, atlas);
      await spritesheet.parse();

      this.pendingLoads.delete(src);

      if (this.isResourceInUse(src)) {
        if (this.resources.has(src)) {
          TextureLoader.release(src);
          throw new Error(`Spritesheet already exists: ${src}`);
        } else {
          this.resources.set(src, spritesheet);
          return spritesheet;
        }
      } else {
        TextureLoader.release(src);
        return undefined;
      }
    })();

    this.pendingLoads.set(src, loadPromise);
    return await loadPromise;
  }

  protected cleanup(spritesheet: Spritesheet, src: string): void {
    spritesheet.destroy();
    TextureLoader.release(src);
  }
}

export default new SpritesheetLoader();
