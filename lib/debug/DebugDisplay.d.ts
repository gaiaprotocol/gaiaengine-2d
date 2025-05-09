import GameObject from "../core/GameObject.js";
import GameScreen from "../screen/GameScreen.js";
export default class DebugDisplay extends GameObject {
    private deltaTime;
    private textDom;
    constructor();
    set screen(screen: GameScreen | undefined);
    get screen(): GameScreen | undefined;
    update(deltaTime: number): void;
    remove(): void;
}
//# sourceMappingURL=DebugDisplay.d.ts.map