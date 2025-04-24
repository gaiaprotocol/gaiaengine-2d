import { DomChild, DomNode } from "@commonmodule/app";
import { EventRecord } from "@commonmodule/ts";
import { DomSelector } from "@commonmodule/universal-page";
import TransformableNode from "../core/TransformableNode.js";
import GameScreen from "../screen/GameScreen.js";
export default class DomWrapperNode<H extends HTMLElement = HTMLElement, E extends EventRecord = EventRecord> extends TransformableNode<E> {
    protected domNode: DomNode;
    constructor(x: number, y: number, elementOrSelector?: H | DomSelector, ...children: DomChild<H>[]);
    protected set screen(screen: GameScreen | undefined);
    protected get screen(): GameScreen | undefined;
    protected update(deltaTime: number): void;
    remove(): void;
}
//# sourceMappingURL=DomWrapperNode.d.ts.map