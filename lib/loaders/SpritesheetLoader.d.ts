import { Spritesheet } from "pixi.js";
import Atlas from "../data/Atlas.js";
import ResourceLoader from "./ResourceLoader.js";
declare class SpritesheetLoader extends ResourceLoader<Spritesheet> {
    private idToSrc;
    protected loadResource(id: string, src: string, atlas: Atlas): Promise<Spritesheet | undefined>;
    protected cleanup(spritesheet: Spritesheet, id: string): void;
}
declare const _default: SpritesheetLoader;
export default _default;
//# sourceMappingURL=SpritesheetLoader.d.ts.map