import { Sprite as PixiSprite } from "pixi.js";
import TextureLoader from "../loaders/TextureLoader.js";
import BaseSprite from "./BaseSprite.js";
export default class Sprite extends BaseSprite {
    async loadTexture(src) {
        const texture = await TextureLoader.load(src);
        if (!texture || this.removed)
            return;
        this.container.addChild(new PixiSprite({ texture, anchor: { x: 0.5, y: 0.5 } }));
    }
    releaseTexture(src) {
        TextureLoader.release(src);
    }
}
//# sourceMappingURL=Sprite.js.map