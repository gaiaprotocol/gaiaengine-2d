import Text from "../dom/Text.js";
import Screen from "../screen/Screen.js";
export default class FpsDisplay extends Text {
    private deltaTime;
    constructor();
    set screen(screen: Screen | undefined);
    get screen(): Screen | undefined;
    update(deltaTime: number): void;
}
//# sourceMappingURL=FpsDisplay.d.ts.map