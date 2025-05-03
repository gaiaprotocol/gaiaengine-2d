import { Browser, DomNode } from "@commonmodule/app";
import GameScreen from "../screen/GameScreen.js";
import Joystick, { JoystickOptions } from "./Joystick.js";

interface CrossPlatformJoystickOptions extends JoystickOptions {
  joystickImage: DomNode;
  knobImage: DomNode;
  maxKnobDistance: number;
  moveThreshold?: number;

  defaultPosition?: { left: number; top: number };

  onMove: (radian: number, distance?: number) => void;
}

export default class CrossPlatformJoystick extends Joystick {
  private defaultPosition: { left: number; top: number } = {
    left: -999999,
    top: -999999,
  };
  private activeTouchId?: number;
  private touchStartX: number = 0;
  private touchStartY: number = 0;
  private isMoving = false;

  private joystickImage?: DomNode;
  private knobImage?: DomNode;

  constructor(private options: CrossPlatformJoystickOptions) {
    super(options);
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
        let distance = Math.hypot(deltaX, deltaY);

        let clampedX = deltaX;
        let clampedY = deltaY;

        if (this.options.maxKnobDistance < distance) {
          const scale = this.options.maxKnobDistance / distance;
          clampedX = deltaX * scale;
          clampedY = deltaY * scale;
          distance = this.options.maxKnobDistance;
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
            this.options.onMove(radian, distance);
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
