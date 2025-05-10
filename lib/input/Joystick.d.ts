import GameObject from "../core/GameObject.js";
export interface JoystickOptions {
    onMove: (radian: number) => void;
    onRelease: () => void;
    onKeydown?: (code: string) => void;
}
export default class Joystick extends GameObject {
    private _options;
    private codesPressed;
    private arrowCodesPressed;
    constructor(_options: JoystickOptions);
    private handleKeyDown;
    private handleKeyUp;
    private handleBlur;
    private calculateRadian;
}
//# sourceMappingURL=Joystick.d.ts.map