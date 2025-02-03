import GameObject from "../core/GameObject.js";
import WindowEventNode from "../core/WindowEventNode.js";
import Sprite from "../image/Sprite.js";
import GameScreen from "../screen/GameScreen.js";

interface JoystickOptions {
  onMove: (radian: number) => void;
  onRelease: () => void;
  onKeydown?: (code: string) => void;

  joystickImage?: string;
  knobImage?: string;
  maxKnobDistance?: number;
}

export default class Joystick extends GameObject {
  private codesPressed: Set<string> = new Set();
  private arrowCodesPressed: Set<string> = new Set();

  private activeTouchId?: number;
  private touchStartX: number = 0;
  private touchStartY: number = 0;

  private eventNode = new WindowEventNode();
  private joystickSprite?: Sprite;
  private knobSprite?: Sprite;

  constructor(private options: JoystickOptions) {
    super(0, 0);

    this.eventNode.appendTo(this)
      .onWindow("keydown", this.handleKeyDown)
      .onWindow("keyup", this.handleKeyUp)
      .onWindow("blur", this.handleBlur);
  }

  protected set screen(screen: GameScreen | undefined) {
    if (screen) {
      screen
        .onDom("touchstart", this.handleTouchStart)
        .onDom("touchmove", this.handleTouchMove)
        .onDom("touchend", this.handleTouchEnd)
        .onDom("touchcancel", this.handleTouchEnd);
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

    if (this.options.joystickImage) {
      this.joystickSprite = new Sprite(
        this.touchStartX,
        this.touchStartY,
        this.options.joystickImage,
      );
    }

    if (this.options.knobImage) {
      this.knobSprite = new Sprite(
        this.touchStartX,
        this.touchStartY,
        this.options.knobImage,
      );
    }
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
          const ratio = this.options.maxKnobDistance / distance;
          clampedX = deltaX * ratio;
          clampedY = deltaY * ratio;
        }

        if (this.knobSprite) {
          this.knobSprite.setPosition(
            this.touchStartX + clampedX,
            this.touchStartY + clampedY,
          );
        }

        if (clampedX !== 0 || clampedY !== 0) {
          const radian = Math.atan2(clampedY, clampedX);
          this.options.onMove(radian);
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
      if (this.joystickSprite) {
        this.joystickSprite.remove();
        this.joystickSprite = undefined;
      }
      if (this.knobSprite) {
        this.knobSprite.remove();
        this.knobSprite = undefined;
      }
      this.options.onRelease();
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

  public remove(): void {
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
