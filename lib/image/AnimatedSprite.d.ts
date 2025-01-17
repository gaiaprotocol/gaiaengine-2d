import GameObject from "../core/GameObject.js";
import Atlas from "../data/Atlas.js";
export default class AnimatedSprite extends GameObject {
    private src;
    private atlas;
    private _animation;
    private fps;
    private id;
    private sheet;
    private currentSprite;
    constructor(x: number, y: number, src: string, atlas: Atlas, _animation: string, fps: number);
    private changeAnimation;
    private load;
    set animation(animation: string);
    get animation(): string;
    remove(): void;
}
//# sourceMappingURL=AnimatedSprite.d.ts.map