import WindowEventNode from "../core/WindowEventNode.js";
interface JoystickOptions {
    onMove: (radian: number) => void;
    onRelease: () => void;
    onKeydown?: (code: string) => void;
}
export default class Joystick extends WindowEventNode {
    private options;
    private codesPressed;
    private arrowCodesPressed;
    constructor(options: JoystickOptions);
    private calculateRadian;
}
export {};
//# sourceMappingURL=Joystick.d.ts.map