import GameObject from "../core/GameObject.js";
export default class Fadeable extends GameObject {
    protected fadingSpeed: number;
    protected minFadingSpeed: number;
    protected maxFadingSpeed: number;
    protected fadingAccel: number;
    fadeIn(speed: number): void;
    fadeOut(speed: number): void;
    protected update(deltaTime: number): void;
}
//# sourceMappingURL=Fadeable%20copy.d.ts.map