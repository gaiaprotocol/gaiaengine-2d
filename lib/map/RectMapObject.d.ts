import Atlas from "../data/Atlas.js";
import Sprite from "../image/Sprite.js";
export default class RectMapObject extends Sprite {
    private fadingSpeed;
    constructor(x: number, y: number, src: string, atlas?: Atlas, frame?: string, fadeDuration?: number);
    protected update(deltaTime: number): void;
}
//# sourceMappingURL=RectMapObject.d.ts.map