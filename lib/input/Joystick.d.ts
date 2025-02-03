import GameObject from "../core/GameObject.js";
interface JoystickOptions {
    onMove: (radian: number) => void;
    onRelease: () => void;
    onKeydown?: (code: string) => void;
    joystickImage?: string;
    knobImage?: string;
    maxKnobDistance?: number;
}
export default class Joystick extends GameObject {
    private options;
    private codesPressed;
    private arrowCodesPressed;
    private activeTouchId?;
    private touchStartX;
    private touchStartY;
    private eventNode;
    private joystickSprite?;
    private knobSprite?;
    constructor(options: JoystickOptions);
    private handleKeyDown;
    private handleKeyUp;
    private handleBlur;
    private handleTouchStart;
    private handleTouchMove;
    private handleTouchEnd;
    private calculateRadian;
}
export {};
//# sourceMappingURL=Joystick.d.ts.map