import BaseSprite from "./BaseSprite.js";
export default class Sprite extends BaseSprite {
    private atlas?;
    private frame?;
    constructor(x: number, y: number, src: string, atlas?: import("pixi.js").SpritesheetData | undefined, frame?: string | undefined);
    protected loadTexture(src: string): Promise<void>;
    protected releaseTexture(src: string): void;
}
//# sourceMappingURL=Sprite.d.ts.map