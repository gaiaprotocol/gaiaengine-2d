import TextNode from "../dom/TextNode.js";
import GameScreen from "../screen/GameScreen.js";
export default class FPSDisplay extends TextNode<{
    fontSize: string;
    color: string;
}> {
    private deltaTime;
    constructor();
    private updatePosition;
    set screen(screen: GameScreen | undefined);
    get screen(): GameScreen | undefined;
    update(deltaTime: number): void;
}
//# sourceMappingURL=FPSDisplay.d.ts.map