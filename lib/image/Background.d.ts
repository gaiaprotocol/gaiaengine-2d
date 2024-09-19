import GameObject from "../core/GameObject.js";
export default class Background extends GameObject {
    private options?;
    private _src;
    private tilingSprite;
    constructor(src: string, options?: {
        scrollSpeedX: number;
    } | undefined);
    private load;
    set src(src: string);
    get src(): string;
    protected update(deltaTime: number): void;
    remove(): void;
}
//# sourceMappingURL=Background.d.ts.map