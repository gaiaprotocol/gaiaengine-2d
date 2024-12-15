import GameObject from "../core/GameObject.js";
export default class Fadeable extends GameObject {
    protected fadingSpeed: number;
    protected minFadingSpeed: number;
    protected maxFadingSpeed: number;
    protected fadingAccel: number;
    fadeIn(duration: number): void;
    fadeOut(duration: number): void;
    protected update(deltaTime: number): void;
}
//# sourceMappingURL=Fadeable.d.ts.map