import GameObject from "../core/GameObject.js";
import BackgroundMusic from "../sound/BackgroundMusic.js";
type SceneConstructor = new () => Scene;
export default abstract class Scene extends GameObject {
    protected bgm: BackgroundMusic | undefined;
    constructor();
    transitionTo(Scene: SceneConstructor): void;
    remove(): void;
}
export {};
//# sourceMappingURL=Scene.d.ts.map