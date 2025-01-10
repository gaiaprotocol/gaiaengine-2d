import Atlas from "../data/Atlas.js";
import AnimatedSprite from "../image/AnimatedSprite.js";
export default class AnimatedRectMapObject extends AnimatedSprite {
    private fadingSpeed;
    constructor(x: number, y: number, src: string, atlas: Atlas, animation: string, fps: number, fadeDuration?: number);
    protected update(deltaTime: number): void;
}
//# sourceMappingURL=AnimatedRectMapObject.d.ts.map