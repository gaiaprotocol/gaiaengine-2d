import Atlas from "../data/Atlas.js";
import Sprite from "../image/Sprite.js";
export default class RectMapTerrain extends Sprite {
    private fadingSpeed;
    constructor(x: number, y: number, src: string, atlas?: Atlas, frame?: string, fadeDuration?: number);
    protected update(deltaTime: number): void;
}
//# sourceMappingURL=RectMapTile.d.ts.map