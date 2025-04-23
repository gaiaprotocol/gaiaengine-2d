import GameObject from "../core/GameObject.js";
import GameScreen from "../screen/GameScreen.js";
interface JoystickOptions {
    onMove: (radian: number) => void;
    onRelease: () => void;
    onKeydown?: (code: string) => void;
    joystickImage: string;
    knobImage: string;
    maxKnobDistance: number;
    moveThreshold: number;
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
    private isMoving;
    constructor(options: JoystickOptions);
    protected set screen(screen: GameScreen | undefined);
    protected get screen(): GameScreen | undefined;
    private handleKeyDown;
    private handleKeyUp;
    private handleBlur;
    private handleTouchStart;
    private handleTouchMove;
    private handleTouchEnd;
    private calculateRadian;
    remove(): void;
}
export {};
//# sourceMappingURL=Joystick.d.ts.map