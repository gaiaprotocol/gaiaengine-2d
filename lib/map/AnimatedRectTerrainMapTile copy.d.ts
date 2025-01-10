import Atlas from "../data/Atlas.js";
import AnimatedSprite from "../image/AnimatedSprite.js";
export default class AnimatedRectTerrainMapTile extends AnimatedSprite {
    private fadingSpeed;
    constructor(x: number, y: number, src: string, atlas: Atlas, animation: string, fps: number, fadeDuration?: number);
    protected update(deltaTime: number): void;
}
//# sourceMappingURL=AnimatedRectTerrainMapTile%20copy.d.ts.map