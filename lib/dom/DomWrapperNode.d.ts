import { DomChild, DomNode } from "@commonmodule/app";
import { DomSelector } from "@commonmodule/universal-page";
import TransformableNode from "../core/TransformableNode.js";
import GameScreen from "../screen/GameScreen.js";
export default class DomWrapperNode<HE extends HTMLElement = HTMLElement> extends TransformableNode {
    protected domNode: DomNode;
    constructor(x: number, y: number, elementOrSelector?: HE | DomSelector, ...children: DomChild<HE>[]);
    protected set screen(screen: GameScreen | undefined);
    protected get screen(): GameScreen | undefined;
    protected update(deltaTime: number): void;
    remove(): void;
}
//# sourceMappingURL=DomWrapperNode.d.ts.map