import BaseImageSprite from "./BaseImageSprite.js";
export default class Background extends BaseImageSprite {
    private options?;
    private tilingSprite;
    constructor(src: string, options?: {
        scrollSpeedX: number;
    } | undefined);
    protected loadTexture(src: string): Promise<void>;
    protected releaseTexture(src: string): void;
    protected update(deltaTime: number): void;
}
//# sourceMappingURL=Background.d.ts.map