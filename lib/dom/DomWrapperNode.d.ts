import { Dom } from "@commonmodule/app";
import GameNode from "../core/GameNode.js";
import TransformableNode from "../core/TransformableNode.js";
import GameScreen from "../screen/GameScreen.js";
export default class DomWrapperNode extends TransformableNode {
    dom: Dom;
    constructor(x: number, y: number, dom: Dom);
    protected set screen(screen: GameScreen | undefined);
    protected get screen(): GameScreen | undefined;
    private updateStyle;
    protected update(deltaTime: number): void;
    appendTo(parent: GameNode, index?: number): this;
    remove(): void;
}
//# sourceMappingURL=DomWrapperNode.d.ts.map