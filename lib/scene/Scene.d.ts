import GameObject from "../core/GameObject.js";
import BackgroundMusic from "../sound/BackgroundMusic.js";
export default abstract class Scene extends GameObject {
    protected bgm: BackgroundMusic | undefined;
    remove(): void;
}
//# sourceMappingURL=Scene.d.ts.map