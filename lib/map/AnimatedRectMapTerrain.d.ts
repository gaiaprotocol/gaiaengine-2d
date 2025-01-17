import Atlas from "../data/Atlas.js";
import AnimatedSprite from "../image/AnimatedSprite.js";
interface AnimatedRectMapTerrainOptions {
    src: string;
    atlas: Atlas;
    animation: string;
    fps: number;
    fadeDuration?: number;
}
export default class AnimatedRectMapTerrain extends AnimatedSprite {
    private fadingSpeed;
    constructor(x: number, y: number, options: AnimatedRectMapTerrainOptions);
    protected update(deltaTime: number): void;
}
export {};
//# sourceMappingURL=AnimatedRectMapTerrain.d.ts.map