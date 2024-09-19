import GameObject from "../core/GameObject.js";
import GameScreen from "./GameScreen.js";
export default class RootNode extends GameObject {
    constructor();
    setScreen(screen: GameScreen | undefined): this;
    getContainer(): import("pixi.js").Container<import("pixi.js").ContainerChild>;
    update(deltaTime: number): void;
}
//# sourceMappingURL=RootNode.d.ts.map