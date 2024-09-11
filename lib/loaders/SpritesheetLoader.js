import { Spritesheet } from "pixi.js";
import ResourceLoader from "./ResourceLoader.js";
import TextureLoader from "./TextureLoader.js";
class SpritesheetLoader extends ResourceLoader {
    async loadFromPath(src, atlas) {
        const loadPromise = (async () => {
            const texture = await TextureLoader.load(src);
            if (!texture)
                throw new Error(`Failed to load texture: ${src}`);
            const spritesheet = new Spritesheet(texture, atlas);
            await spritesheet.parse();
            this.pendingLoads.delete(src);
            if (this.isResourceInUse(src)) {
                if (this.resources.has(src)) {
                    TextureLoader.release(src);
                    throw new Error(`Spritesheet already exists: ${src}`);
                }
                else {
                    this.resources.set(src, spritesheet);
                    return spritesheet;
                }
            }
            else {
                TextureLoader.release(src);
                return undefined;
            }
        })();
        this.pendingLoads.set(src, loadPromise);
        return await loadPromise;
    }
    cleanup(spritesheet, src) {
        spritesheet.destroy();
        TextureLoader.release(src);
    }
}
export default new SpritesheetLoader();
//# sourceMappingURL=SpritesheetLoader.js.map