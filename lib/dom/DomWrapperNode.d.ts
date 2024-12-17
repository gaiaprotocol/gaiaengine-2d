import { DomChild, DomNode } from "@common-module/app";
import { DomSelector } from "@common-module/universal-page";
import GameObject from "../core/GameObject.js";
import GameScreen from "../screen/GameScreen.js";
export default class DomWrapperNode<HE extends HTMLElement = HTMLElement> extends GameObject {
    protected domNode: DomNode;
    constructor(x: number, y: number, elementOrSelector?: HE | DomSelector, ...children: DomChild<HE>[]);
    set screen(screen: GameScreen | undefined);
    get screen(): GameScreen | undefined;
    protected update(deltaTime: number): void;
    remove(): void;
}
//# sourceMappingURL=DomWrapperNode.d.ts.map