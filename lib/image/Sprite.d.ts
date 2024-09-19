import BaseSprite from "./BaseSprite.js";
export default class Sprite extends BaseSprite {
    constructor(x: number, y: number, src: string);
    protected loadTexture(src: string): Promise<void>;
    protected releaseTexture(src: string): void;
}
//# sourceMappingURL=Sprite.d.ts.map