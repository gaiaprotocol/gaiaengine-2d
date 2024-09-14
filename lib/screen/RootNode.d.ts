import GameObject from "../core/GameObject.js";
import GameScreen from "./GameScreen.js";
export default class RootNode extends GameObject {
    constructor();
    set screen(screen: GameScreen | undefined);
    getContainer(): import("pixi.js").Container<import("pixi.js").ContainerChild>;
    update(deltaTime: number): void;
}
//# sourceMappingURL=RootNode.d.ts.map