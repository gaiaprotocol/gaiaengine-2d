import { Browser, DomNode } from "@commonmodule/app";
import GameObject from "../core/GameObject.js";
import WindowEventNode from "../core/WindowEventNode.js";
import GameScreen from "../screen/GameScreen.js";

interface JoystickOptions {
  onMove: (radian: number) => void;
  onRelease: () => void;
  onKeydown?: (code: string) => void;

  joystickImage?: DomNode;
  knobImage?: DomNode;
  maxKnobDistance?: number;
  moveThreshold?: number;

  defaultPosition?: { left: number; top: number };
}

export default class Joystick extends GameObject {
  private codesPressed: Set<string> = new Set();
  private arrowCodesPressed: Set<string> = new Set();

  private defaultPosition: { left: number; top: number } = {
    left: -999999,
    top: -999999,
  };
  private activeTouchId?: number;
  private touchStartX: number = 0;
  private touchStartY: number = 0;
  private isMoving = false;

  private eventNode = new WindowEventNode();
  private joystickImage?: DomNode;
  private knobImage?: DomNode;

  constructor(private options: JoystickOptions) {
    super(0, 0);

    this.eventNode.appendTo(this)
      .onWindow("keydown", this.handleKeyDown)
      .onWindow("keyup", this.handleKeyUp)
      .onWindow("blur", this.handleBlur);

    if (Browser.isMobileDevice()) {
      if (options.defaultPosition) {
        this.defaultPosition = options.defaultPosition;
      }
      this.joystickImage = options.joystickImage;
      this.knobImage = options.knobImage;
    }
  }

  protected set screen(screen: GameScreen | undefined) {
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

  protected get screen() {
    return super.screen;
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    const code = event.code;

    if (this.codesPressed.has(code)) return;
    this.codesPressed.add(code);
    this.options.onKeydown?.(code);

    if (
      code === "ArrowUp" ||
      code === "ArrowDown" ||
      code === "ArrowLeft" ||
      code === "ArrowRight"
    ) {
      this.arrowCodesPressed.add(code);
      this.calculateRadian();
    }
  };

  private handleKeyUp = (event: KeyboardEvent) => {
    const code = event.code;
    this.codesPressed.delete(code);

    if (
      code === "ArrowUp" ||
      code === "ArrowDown" ||
      code === "ArrowLeft" ||
      code === "ArrowRight"
    ) {
      this.arrowCodesPressed.delete(code);
      if (this.arrowCodesPressed.size === 0) {
        this.options.onRelease();
      } else {
        this.calculateRadian();
      }
    }
  };

  private handleBlur = (event: Event) => {
    this.arrowCodesPressed.clear();
    this.options.onRelease();
  };

  private handleTouchStart = (event: TouchEvent) => {
    event.preventDefault();

    if (this.activeTouchId !== undefined) return;

    const touch = event.changedTouches[0];
    this.activeTouchId = touch.identifier;
    this.touchStartX = touch.clientX;
    this.touchStartY = touch.clientY;
    this.isMoving = false;

    if (!this.screen) return;

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

  private handleTouchMove = (event: TouchEvent) => {
    event.preventDefault();

    if (this.activeTouchId === undefined) return;

    for (let i = 0; i < event.changedTouches.length; i++) {
      const touch = event.changedTouches[i];
      if (touch.identifier === this.activeTouchId) {
        const deltaX = touch.clientX - this.touchStartX;
        const deltaY = touch.clientY - this.touchStartY;
        const distance = Math.hypot(deltaX, deltaY);

        let clampedX = deltaX;
        let clampedY = deltaY;

        if (
          this.options.maxKnobDistance !== undefined &&
          this.options.maxKnobDistance < distance
        ) {
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

        if (
          this.isMoving ||
          this.options.moveThreshold === undefined ||
          distance >= this.options.moveThreshold
        ) {
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

  private handleTouchEnd = (event: TouchEvent) => {
    if (this.activeTouchId === undefined) return;

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

      if (this.isMoving) this.options.onRelease();
    }
  };

  private calculateRadian(): void {
    let dx = 0;
    let dy = 0;

    if (this.arrowCodesPressed.has("ArrowUp")) dy -= 1;
    if (this.arrowCodesPressed.has("ArrowDown")) dy += 1;
    if (this.arrowCodesPressed.has("ArrowLeft")) dx -= 1;
    if (this.arrowCodesPressed.has("ArrowRight")) dx += 1;

    if (dx !== 0 || dy !== 0) {
      const radian = Math.atan2(dy, dx);
      this.options.onMove(radian);
    }
  }

  public setDefaultPosition(position: { left: number; top: number }): void {
    this.defaultPosition = position;

    if (this.activeTouchId !== undefined) return;

    this.joystickImage?.style({
      left: `${this.defaultPosition.left}px`,
      top: `${this.defaultPosition.top}px`,
    });
    this.knobImage?.style({
      left: `${this.defaultPosition.left}px`,
      top: `${this.defaultPosition.top}px`,
    });
  }

  public remove(): void {
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
