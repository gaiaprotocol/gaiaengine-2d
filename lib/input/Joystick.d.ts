import { DomNode } from "@commonmodule/app";
import GameObject from "../core/GameObject.js";
import GameScreen from "../screen/GameScreen.js";
interface JoystickOptions {
    onMove: (radian: number) => void;
    onRelease: () => void;
    onKeydown?: (code: string) => void;
    joystickImage?: DomNode;
    knobImage?: DomNode;
    maxKnobDistance?: number;
    moveThreshold?: number;
    defaultPosition?: {
        left: number;
        top: number;
    };
}
export default class Joystick extends GameObject {
    private options;
    private codesPressed;
    private arrowCodesPressed;
    private defaultPosition;
    private activeTouchId?;
    private touchStartX;
    private touchStartY;
    private isMoving;
    private eventNode;
    private joystickImage?;
    private knobImage?;
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
    setDefaultPosition(position: {
        left: number;
        top: number;
    }): void;
    remove(): void;
}
export {};
//# sourceMappingURL=Joystick.d.ts.map