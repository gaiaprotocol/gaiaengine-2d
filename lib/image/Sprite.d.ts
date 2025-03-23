import Atlas from "../data/Atlas.js";
import BaseImageSprite from "./BaseImageSprite.js";
export default class Sprite extends BaseImageSprite {
    private atlas?;
    private frame?;
    private id?;
    constructor(x: number, y: number, src: string, atlas?: Atlas | undefined, frame?: string | undefined);
    protected loadTexture(src: string): Promise<void>;
    protected releaseTexture(src: string): void;
}
//# sourceMappingURL=Sprite.d.ts.map