import { EventRecord, EventTreeNode } from "@commonmodule/ts";
import GameScreen from "../screen/GameScreen.js";
export default abstract class GameNode<E extends EventRecord = {}> extends EventTreeNode<GameNode, E> {
    private _screen;
    protected set screen(screen: GameScreen | undefined);
    protected get screen(): GameScreen | undefined;
    append(...children: (GameNode | undefined)[]): this;
    appendTo(parent: GameNode, index?: number): this;
    protected update(deltaTime: number): void;
}
//# sourceMappingURL=GameNode.d.ts.map