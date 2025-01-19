import WindowEventNode from "../core/WindowEventNode.js";

interface JoystickOptions {
  onMove: (radian: number) => void;
  onRelease: () => void;
  onKeydown?: (code: string) => void;
}

export default class Joystick extends WindowEventNode {
  private codesPressed: Set<string> = new Set();
  private arrowCodesPressed: Set<string> = new Set();

  constructor(private options: JoystickOptions) {
    super();
    this.onWindow("keydown", (event: KeyboardEvent) => {
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
    }).onWindow("keyup", (event: KeyboardEvent) => {
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
