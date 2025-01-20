import GameObject from "../core/GameObject.js";
import GameScreen from "./GameScreen.js";
export default class SuperRootNode extends GameObject {
    constructor();
    setScreen(screen: GameScreen | undefined): this;
    getContainer(): import("pixi.js").Container<import("pixi.js").ContainerChild>;
    update(deltaTime: number): void;
}
//# sourceMappingURL=SuperRootNode.d.ts.map