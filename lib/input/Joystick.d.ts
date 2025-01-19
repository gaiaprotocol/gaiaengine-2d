import WindowEventNode from "../core/WindowEventNode.js";
export default class Joystick extends WindowEventNode {
    private onMove;
    private onRelease;
    private keysPressed;
    constructor(onMove: (radian: number) => void, onRelease: () => void);
    private calculateRadian;
}
//# sourceMappingURL=Joystick.d.ts.map