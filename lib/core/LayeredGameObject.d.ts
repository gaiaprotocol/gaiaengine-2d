import GameScreen from "../screen/GameScreen.js";
import GameNode from "./GameNode.js";
import TransformableNode from "./TransformableNode.js";
export default class LayeredGameObject extends TransformableNode {
    private layer;
    private container;
    constructor(x: number, y: number, layer: string, ...gameNodes: (GameNode | undefined)[]);
    set screen(screen: GameScreen | undefined);
    get screen(): GameScreen | undefined;
    protected update(deltaTime: number): void;
    remove(): void;
}
//# sourceMappingURL=LayeredGameObject.d.ts.map