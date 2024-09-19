import { SpritesheetData } from "pixi.js";
import BaseSprite from "./BaseSprite.js";
export default class AnimatedSprite extends BaseSprite {
    private atlas;
    private animation;
    private fps;
    private animatedSprite;
    constructor(x: number, y: number, src: string, atlas: SpritesheetData, animation: string, fps: number);
    protected loadTexture(src: string): Promise<void>;
    protected releaseTexture(src: string): void;
}
//# sourceMappingURL=AnimatedSprite.d.ts.map