import Atlas from "../data/Atlas.js";
import AnimatedSprite from "../image/AnimatedSprite.js";
interface AnimatedRectMapObjectOptions {
    src: string;
    atlas: Atlas;
    animation: string;
    fps: number;
    fadeDuration?: number;
}
export default class AnimatedRectMapObject extends AnimatedSprite {
    private fadingSpeed;
    constructor(x: number, y: number, options: AnimatedRectMapObjectOptions);
    protected update(deltaTime: number): void;
}
export {};
//# sourceMappingURL=AnimatedRectMapObject.d.ts.map