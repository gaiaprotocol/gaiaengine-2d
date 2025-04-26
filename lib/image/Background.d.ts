import BaseImageSprite from "./BaseImageSprite.js";
export default class Background extends BaseImageSprite {
    private options?;
    private tilingSprite?;
    private _scrollSpeedX;
    private _scrollSpeedY;
    constructor(src: string, options?: {
        scrollSpeedX?: number;
        scrollSpeedY?: number;
    } | undefined);
    protected loadTexture(src: string): Promise<void>;
    protected releaseTexture(src: string): void;
    protected update(deltaTime: number): void;
    set scrollSpeedX(value: number);
    get scrollSpeedX(): number;
    set scrollSpeedY(value: number);
    get scrollSpeedY(): number;
}
//# sourceMappingURL=Background.d.ts.map