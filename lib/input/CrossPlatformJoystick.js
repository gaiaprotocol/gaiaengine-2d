import { Browser } from "@commonmodule/app";
import Joystick from "./Joystick.js";
export default class CrossPlatformJoystick extends Joystick {
    options;
    defaultPosition = {
        left: -999999,
        top: -999999,
    };
    activeTouchId;
    touchStartX = 0;
    touchStartY = 0;
    isMoving = false;
    joystickImage;
    knobImage;
    constructor(options) {
        super(options);
        this.options = options;
        if (Browser.isMobileDevice()) {
            if (options.defaultPosition) {
                this.defaultPosition = options.defaultPosition;
            }
            this.joystickImage = options.joystickImage;
            this.knobImage = options.knobImage;
        }
    }
    set screen(screen) {
        if (screen) {
            screen
                .onDom("touchstart", this.handleTouchStart)
                .onDom("touchmove", this.handleTouchMove)
                .onDom("touchend", this.handleTouchEnd)
                .onDom("touchcancel", this.handleTouchEnd);
            this.joystickImage?.style({
                left: `${this.defaultPosition.left}px`,
                top: `${this.defaultPosition.top}px`,
                zIndex: "999998",
                transform: "translate(-50%, -50%)",
            }).appendTo(screen);
            this.knobImage?.style({
                left: `${this.defaultPosition.left}px`,
                top: `${this.defaultPosition.top}px`,
                zIndex: "999998",
                transform: "translate(-50%, -50%)",
            }).appendTo(screen);
        }
        super.screen = screen;
    }
    get screen() {
        return super.screen;
    }
    handleTouchStart = (event) => {
        event.preventDefault();
        if (this.activeTouchId !== undefined)
            return;
        const touch = event.changedTouches[0];
        this.activeTouchId = touch.identifier;
        this.touchStartX = touch.clientX;
        this.touchStartY = touch.clientY;
        this.isMoving = false;
        if (!this.screen)
            return;
        const screenRect = this.screen.calculateRect();
        this.joystickImage?.style({
            left: `${this.touchStartX - screenRect.left}px`,
            top: `${this.touchStartY - screenRect.top}px`,
        });
        this.knobImage?.style({
            left: `${this.touchStartX - screenRect.left}px`,
            top: `${this.touchStartY - screenRect.top}px`,
        });
    };
    handleTouchMove = (event) => {
        event.preventDefault();
        if (this.activeTouchId === undefined)
            return;
        for (let i = 0; i < event.changedTouches.length; i++) {
            const touch = event.changedTouches[i];
            if (touch.identifier === this.activeTouchId) {
                const deltaX = touch.clientX - this.touchStartX;
                const deltaY = touch.clientY - this.touchStartY;
                const distance = Math.hypot(deltaX, deltaY);
                let clampedX = deltaX;
                let clampedY = deltaY;
                if (this.options.maxKnobDistance < distance) {
                    const scale = this.options.maxKnobDistance / distance;
                    clampedX = deltaX * scale;
                    clampedY = deltaY * scale;
                }
                if (this.screen) {
                    const screenRect = this.screen.calculateRect();
                    this.knobImage?.style({
                        left: `${this.touchStartX - screenRect.left + clampedX}px`,
                        top: `${this.touchStartY - screenRect.top + clampedY}px`,
                    });
                }
                if (this.isMoving || distance >= this.options.moveThreshold) {
                    this.isMoving = true;
                    if (clampedX !== 0 || clampedY !== 0) {
                        const radian = Math.atan2(clampedY, clampedX);
                        this.options.onMove(radian);
                    }
                }
                break;
            }
        }
    };
    handleTouchEnd = (event) => {
        if (this.activeTouchId === undefined)
            return;
        let ended = false;
        for (let i = 0; i < event.changedTouches.length; i++) {
            if (event.changedTouches[i].identifier === this.activeTouchId) {
                ended = true;
                break;
            }
        }
        if (ended) {
            this.activeTouchId = undefined;
            this.joystickImage?.style({
                left: `${this.defaultPosition.left}px`,
                top: `${this.defaultPosition.top}px`,
            });
            this.knobImage?.style({
                left: `${this.defaultPosition.left}px`,
                top: `${this.defaultPosition.top}px`,
            });
            if (this.isMoving)
                this.options.onRelease();
        }
    };
    setDefaultPosition(position) {
        this.defaultPosition = position;
        if (this.activeTouchId !== undefined)
            return;
        this.joystickImage?.style({
            left: `${this.defaultPosition.left}px`,
            top: `${this.defaultPosition.top}px`,
        });
        this.knobImage?.style({
            left: `${this.defaultPosition.left}px`,
            top: `${this.defaultPosition.top}px`,
        });
    }
    remove() {
        if (this.screen) {
            this.screen
                .offDom("touchstart", this.handleTouchStart)
                .offDom("touchmove", this.handleTouchMove)
                .offDom("touchend", this.handleTouchEnd)
                .offDom("touchcancel", this.handleTouchEnd);
            this.joystickImage?.remove();
            this.knobImage?.remove();
        }
        super.remove();
    }
}
//# sourceMappingURL=CrossPlatformJoystick.js.map