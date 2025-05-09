import { Dom } from "@commonmodule/app";
import GameScreen from "../screen/GameScreen.js";
import Joystick, { JoystickOptions } from "./Joystick.js";
interface CrossPlatformJoystickOptions extends JoystickOptions {
    joystickImage: Dom;
    knobImage: Dom;
    maxKnobDistance: number;
    moveThreshold?: number;
    defaultPosition?: {
        left: number;
        top: number;
    };
    onMove: (radian: number, distance?: number) => void;
}
export default class CrossPlatformJoystick extends Joystick {
    private options;
    private defaultPosition;
    private activeTouchId?;
    private touchStartX;
    private touchStartY;
    private isMoving;
    private joystickImage?;
    private knobImage?;
    constructor(options: CrossPlatformJoystickOptions);
    protected set screen(screen: GameScreen | undefined);
    protected get screen(): GameScreen | undefined;
    private handleTouchStart;
    private handleTouchMove;
    private handleTouchEnd;
    setDefaultPosition(position: {
        left: number;
        top: number;
    }): void;
    remove(): void;
}
export {};
//# sourceMappingURL=CrossPlatformJoystick.d.ts.map