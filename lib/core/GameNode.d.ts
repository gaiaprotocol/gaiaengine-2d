import { EventHandlers, EventNode } from "@commonmodule/ts";
import GameScreen from "../screen/GameScreen.js";
export default abstract class GameNode<E extends EventHandlers = {}> extends EventNode<GameNode, E> {
    private _screen;
    private _paused;
    protected set screen(screen: GameScreen | undefined);
    protected get screen(): GameScreen | undefined;
    append(...children: (GameNode | undefined)[]): this;
    appendTo(parent: GameNode, index?: number): this;
    pause(): void;
    resume(): void;
    isPaused(): boolean;
    protected update(deltaTime: number): void;
}
//# sourceMappingURL=GameNode.d.ts.map