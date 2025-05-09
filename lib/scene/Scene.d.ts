import { BackgroundMusic } from "@commonmodule/app";
import { EventHandlers } from "@commonmodule/ts";
import GameObject from "../core/GameObject.js";
type SceneConstructor = new () => Scene;
export default abstract class Scene<E extends EventHandlers = {}> extends GameObject<E> {
    protected bgm: BackgroundMusic | undefined;
    constructor();
    transitionTo(Scene: SceneConstructor): void;
    remove(): void;
}
export {};
//# sourceMappingURL=Scene.d.ts.map