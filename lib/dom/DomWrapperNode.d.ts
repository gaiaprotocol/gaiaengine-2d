import { Dom, DomChild } from "@commonmodule/app";
import { EventHandlers } from "@commonmodule/ts";
import { DomSelector } from "@commonmodule/universal-page";
import GameNode from "../core/GameNode.js";
import TransformableNode from "../core/TransformableNode.js";
import GameScreen from "../screen/GameScreen.js";
export default class DomWrapperNode<H extends HTMLElement = HTMLElement, E extends EventHandlers = {}> extends TransformableNode<E> {
    protected dom: Dom;
    constructor(x: number, y: number, elementOrSelector?: H | DomSelector, ...children: DomChild<H>[]);
    protected set screen(screen: GameScreen | undefined);
    protected get screen(): GameScreen | undefined;
    private updateStyle;
    protected update(deltaTime: number): void;
    appendTo(parent: GameNode, index?: number): this;
    remove(): void;
}
//# sourceMappingURL=DomWrapperNode.d.ts.map