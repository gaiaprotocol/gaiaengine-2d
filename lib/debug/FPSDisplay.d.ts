import GameScreen from "../screen/GameScreen.js";
import DomTextNode from "../text/DomTextNode.js";
export default class FPSDisplay extends DomTextNode<{
    fontSize: string;
    color: string;
    textAlign: string;
    width: string;
    height: string;
}> {
    private additionalX;
    private additionalY;
    private deltaTime;
    constructor(additionalX?: number, additionalY?: number);
    private updatePosition;
    set screen(screen: GameScreen | undefined);
    get screen(): GameScreen | undefined;
    update(deltaTime: number): void;
}
//# sourceMappingURL=FPSDisplay.d.ts.map