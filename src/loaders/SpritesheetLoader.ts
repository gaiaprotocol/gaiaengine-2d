import { ResourceLoader } from "@commonmodule/ts";
import { Spritesheet } from "pixi.js";
import Atlas from "../data/Atlas.js";
import TextureLoader from "./TextureLoader.js";

class SpritesheetLoader extends ResourceLoader<Spritesheet> {
  private idToSrc: Map<string, string> = new Map();

  protected async loadResource(
    id: string,
    src: string,
    atlas: Atlas,
  ): Promise<Spritesheet | undefined> {
    this.idToSrc.set(id, src);

    const loadPromise = (async () => {
      const texture = await TextureLoader.load(src);
      if (!texture) throw new Error(`Failed to load texture: ${src}`);

      const spritesheet = new Spritesheet(texture, atlas);
      await spritesheet.parse();

      this.pendingLoads.delete(id);

      if (this.isResourceInUse(id)) {
        if (this.resources.has(id)) {
          TextureLoader.release(src);
          throw new Error(`Spritesheet already exists: ${src}`);
        } else {
          this.resources.set(id, spritesheet);
          return spritesheet;
        }
      } else {
        TextureLoader.release(src);
        return undefined;
      }
    })();

    this.pendingLoads.set(id, loadPromise);
    return await loadPromise;
  }

  protected cleanup(id: string, spritesheet: Spritesheet): void {
    spritesheet.destroy();

    const src = this.idToSrc.get(id);
    if (src) TextureLoader.release(src);
  }
}

export default new SpritesheetLoader();
