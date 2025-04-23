import GameObject from "../core/GameObject.js";
import WindowEventNode from "../core/WindowEventNode.js";
import Sprite from "../image/Sprite.js";
export default class Joystick extends GameObject {
    options;
    codesPressed = new Set();
    arrowCodesPressed = new Set();
    activeTouchId;
    touchStartX = 0;
    touchStartY = 0;
    eventNode = new WindowEventNode();
    joystickSprite;
    knobSprite;
    isMoving = false;
    constructor(options) {
        super(0, 0);
        this.options = options;
        this.eventNode.appendTo(this)
            .onWindow("keydown", this.handleKeyDown)
            .onWindow("keyup", this.handleKeyUp)
            .onWindow("blur", this.handleBlur);
    }
    set screen(screen) {
        if (screen) {
            screen
                .onDom("touchstart", this.handleTouchStart)
                .onDom("touchmove", this.handleTouchMove)
                .onDom("touchend", this.handleTouchEnd)
                .onDom("touchcancel", this.handleTouchEnd);
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
        this.joystickSprite = new Sprite((this.touchStartX - this.globalTransform.x) /
            this.globalTransform.scaleX, (this.touchStartY - this.globalTransform.y) /
            this.globalTransform.scaleY, this.options.joystickImage).appendTo(this);
        this.joystickSprite.scaleX = 1 / this.globalTransform.scaleX;
        this.joystickSprite.scaleY = 1 / this.globalTransform.scaleY;
        this.knobSprite = new Sprite((this.touchStartX - this.globalTransform.x) /
            this.globalTransform.scaleX, (this.touchStartY - this.globalTransform.y) /
            this.globalTransform.scaleY, this.options.knobImage).appendTo(this);
        this.knobSprite.scaleX = 1 / this.globalTransform.scaleX;
        this.knobSprite.scaleY = 1 / this.globalTransform.scaleY;
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
                this.knobSprite?.setPosition((this.touchStartX + clampedX - this.globalTransform.x) /
                    this.globalTransform.scaleX, (this.touchStartY + clampedY - this.globalTransform.y) /
                    this.globalTransform.scaleY);
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
            if (this.joystickSprite) {
                this.joystickSprite.remove();
                this.joystickSprite = undefined;
            }
            if (this.knobSprite) {
                this.knobSprite.remove();
                this.knobSprite = undefined;
            }
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
        }
        super.remove();
    }
}
//# sourceMappingURL=Joystick.js.map