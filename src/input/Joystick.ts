import GameObject from "../core/GameObject.js";
import WindowEventNode from "../core/WindowEventNode.js";

interface JoystickOptions {
  onMove: (radian: number) => void;
  onRelease: () => void;
  onKeydown?: (code: string) => void;

  maxKnobDistance?: number;
}

export default class Joystick extends GameObject {
  private eventNode = new WindowEventNode();

  private codesPressed: Set<string> = new Set();
  private arrowCodesPressed: Set<string> = new Set();

  private activeTouchId?: number;
  private touchStartX: number = 0;
  private touchStartY: number = 0;

  constructor(private options: JoystickOptions) {
    super(0, 0);
    this.eventNode.appendTo(this).onWindow(
      "keydown",
      (event: KeyboardEvent) => {
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
      },
    ).onWindow("keyup", (event: KeyboardEvent) => {
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
    }).onWindow("blur", () => {
      this.arrowCodesPressed.clear();
      this.options.onRelease();
    }).onWindow("touchstart", (event: TouchEvent) => {
      if (this.activeTouchId == undefined) return;

      const touch = event.changedTouches[0];
      this.activeTouchId = touch.identifier;
      this.touchStartY = touch.clientX;
      this.touchStartY = touch.clientY;

      //TODO:
    }).onWindow("touchmove", (event: TouchEvent) => {
      if (this.activeTouchId === undefined) return;

      for (let i = 0; i < event.changedTouches.length; i++) {
        const touch = event.changedTouches[i];
        if (touch.identifier === this.activeTouchId) {
          const deltaX = touch.clientX - this.touchStartY;
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

          //TODO:

          if (clampedX !== 0 || clampedY !== 0) {
            const radian = Math.atan2(clampedY, clampedX);
            this.options.onMove(radian);
          }
          break;
        }
      }
    }).onWindow("touchend", (event: TouchEvent) => {
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
        //TODO:
        this.options.onRelease();
      }
    }).onWindow("touchcancel", (event: TouchEvent) => {
    });
  }

  private calculateRadian() {
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
}
