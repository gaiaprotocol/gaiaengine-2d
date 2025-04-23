import GameObject from "../core/GameObject.js";
import WindowEventNode from "../core/WindowEventNode.js";
export default class Joystick extends GameObject {
    options;
    codesPressed = new Set();
    arrowCodesPressed = new Set();
    activeTouchId;
    touchStartX = 0;
    touchStartY = 0;
    eventNode = new WindowEventNode();
    joystickImage;
    knobImage;
    isMoving = false;
    constructor(options) {
        super(0, 0);
        this.options = options;
        this.eventNode.appendTo(this)
            .onWindow("keydown", this.handleKeyDown)
            .onWindow("keyup", this.handleKeyUp)
            .onWindow("blur", this.handleBlur);
        this.joystickImage = options.joystickImage;
        this.knobImage = options.knobImage;
    }
    set screen(screen) {
        if (screen) {
            screen
                .onDom("touchstart", this.handleTouchStart)
                .onDom("touchmove", this.handleTouchMove)
                .onDom("touchend", this.handleTouchEnd)
                .onDom("touchcancel", this.handleTouchEnd);
            this.joystickImage.style({
                left: "-999999px",
                top: "-999999px",
                zIndex: "999998",
                transform: "translate(-50%, -50%)",
            }).appendTo(screen);
            this.knobImage.style({
                left: "-999999px",
                top: "-999999px",
                zIndex: "999998",
                transform: "translate(-50%, -50%)",
            }).appendTo(screen);
        }
        super.screen = screen;
    }
    get screen() {
        return super.screen;
    }
    handleKeyDown = (event) => {
        const code = event.code;
        if (this.codesPressed.has(code))
            return;
        this.codesPressed.add(code);
        this.options.onKeydown?.(code);
        if (code === "ArrowUp" ||
            code === "ArrowDown" ||
            code === "ArrowLeft" ||
            code === "ArrowRight") {
            this.arrowCodesPressed.add(code);
            this.calculateRadian();
        }
    };
    handleKeyUp = (event) => {
        const code = event.code;
        this.codesPressed.delete(code);
        if (code === "ArrowUp" ||
            code === "ArrowDown" ||
            code === "ArrowLeft" ||
            code === "ArrowRight") {
            this.arrowCodesPressed.delete(code);
            if (this.arrowCodesPressed.size === 0) {
                this.options.onRelease();
            }
            else {
                this.calculateRadian();
            }
        }
    };
    handleBlur = (event) => {
        this.arrowCodesPressed.clear();
        this.options.onRelease();
    };
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
        this.joystickImage.style({
            left: `${this.touchStartX - screenRect.left}px`,
            top: `${this.touchStartY - screenRect.top}px`,
        });
        this.knobImage.style({
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
                    this.knobImage.style({
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
            this.joystickImage.style({ left: "-999999px", top: "-999999px" });
            this.knobImage.style({ left: "-999999px", top: "-999999px" });
            if (this.isMoving)
                this.options.onRelease();
        }
    };
    calculateRadian() {
        let dx = 0;
        let dy = 0;
        if (this.arrowCodesPressed.has("ArrowUp"))
            dy -= 1;
        if (this.arrowCodesPressed.has("ArrowDown"))
            dy += 1;
        if (this.arrowCodesPressed.has("ArrowLeft"))
            dx -= 1;
        if (this.arrowCodesPressed.has("ArrowRight"))
            dx += 1;
        if (dx !== 0 || dy !== 0) {
            const radian = Math.atan2(dy, dx);
            this.options.onMove(radian);
        }
    }
    remove() {
        if (this.screen) {
            this.screen
                .offDom("touchstart", this.handleTouchStart)
                .offDom("touchmove", this.handleTouchMove)
                .offDom("touchend", this.handleTouchEnd)
                .offDom("touchcancel", this.handleTouchEnd);
            this.joystickImage.remove();
            this.knobImage.remove();
        }
        super.remove();
    }
}
//# sourceMappingURL=Joystick.js.map