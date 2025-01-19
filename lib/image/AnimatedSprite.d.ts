import GameObject from "../core/GameObject.js";
import Atlas from "../data/Atlas.js";
interface AnimatedSpriteOptions {
    src: string;
    atlas: Atlas;
    animation: string;
    fps: number;
    loop?: boolean;
    onAnimationEnd?: (animation: string) => void;
}
export default class AnimatedSprite extends GameObject {
    private options;
    private id;
    private _animation;
    private sheet;
    private currentSprite;
    constructor(x: number, y: number, options: AnimatedSpriteOptions);
    private changeAnimation;
    private load;
    set animation(animation: string);
    get animation(): string;
    get loop(): boolean;
    set loop(loop: boolean);
    remove(): void;
}
export {};
//# sourceMappingURL=AnimatedSprite.d.ts.map