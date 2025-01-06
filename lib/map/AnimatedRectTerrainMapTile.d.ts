import { SpritesheetData } from "pixi.js";
import AnimatedSprite from "../image/AnimatedSprite.js";
export default class AnimatedRectTerrainMapTile extends AnimatedSprite {
    private fadingSpeed;
    constructor(x: number, y: number, src: string, atlas: SpritesheetData, animation: string, fps: number, fadeDuration?: number);
    protected update(deltaTime: number): void;
}
//# sourceMappingURL=AnimatedRectTerrainMapTile.d.ts.map