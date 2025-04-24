import { EventRecord } from "@commonmodule/ts";
import GameScreen from "../screen/GameScreen.js";
import GameNode from "./GameNode.js";
import TransformableNode from "./TransformableNode.js";
export default class LayeredGameObject<E extends EventRecord = EventRecord> extends TransformableNode<E> {
    private layer;
    private container;
    constructor(x: number, y: number, layer: string, ...gameNodes: (GameNode | undefined)[]);
    protected set screen(screen: GameScreen | undefined);
    protected get screen(): GameScreen | undefined;
    protected update(deltaTime: number): void;
    remove(): void;
}
//# sourceMappingURL=LayeredGameObject.d.ts.map