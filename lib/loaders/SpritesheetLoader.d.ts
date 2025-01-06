import { Spritesheet } from "pixi.js";
import Atlas from "../data/Atlas.js";
import ResourceLoader from "./ResourceLoader.js";
declare class SpritesheetLoader extends ResourceLoader<Spritesheet> {
    protected loadFromPath(src: string, atlas: Atlas): Promise<Spritesheet | undefined>;
    protected cleanup(spritesheet: Spritesheet, src: string): void;
}
declare const _default: SpritesheetLoader;
export default _default;
//# sourceMappingURL=SpritesheetLoader.d.ts.map