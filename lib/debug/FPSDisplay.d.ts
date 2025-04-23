import GameObject from "../core/GameObject.js";
import GameScreen from "../screen/GameScreen.js";
export default class FPSDisplay extends GameObject {
    private deltaTime;
    private textNode;
    constructor();
    set screen(screen: GameScreen | undefined);
    get screen(): GameScreen | undefined;
    update(deltaTime: number): void;
    remove(): void;
}
//# sourceMappingURL=FPSDisplay.d.ts.map