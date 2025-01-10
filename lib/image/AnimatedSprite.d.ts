import GameObject from "../core/GameObject.js";
import Atlas from "../data/Atlas.js";
export default class AnimatedSprite extends GameObject {
    private src;
    private atlas;
    private animation;
    private fps;
    private id;
    private animatedSprite;
    constructor(x: number, y: number, src: string, atlas: Atlas, animation: string, fps: number);
    private load;
    remove(): void;
}
//# sourceMappingURL=AnimatedSprite.d.ts.map