import GameObject from "../core/GameObject.js";
import WindowEventNode from "../core/WindowEventNode.js";

export interface JoystickOptions {
  onMove: (radian: number) => void;
  onRelease: () => void;
  onKeydown?: (code: string) => void;
}

export default class Joystick extends GameObject {
  private codesPressed: Set<string> = new Set();
  private arrowCodesPressed: Set<string> = new Set();
  private eventNode = new WindowEventNode();

  constructor(private _options: JoystickOptions) {
    super(0, 0);

    this.eventNode.appendTo(this)
      .onWindow("keydown", this.handleKeyDown)
      .onWindow("keyup", this.handleKeyUp)
      .onWindow("blur", this.handleBlur);
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    const code = event.code;

    if (this.codesPressed.has(code)) return;
    this.codesPressed.add(code);
    this._options.onKeydown?.(code);

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
        this._options.onRelease();
      } else {
        this.calculateRadian();
      }
    }
  };

  private handleBlur = () => {
    this.arrowCodesPressed.clear();
    this._options.onRelease();
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
      this._options.onMove(radian);
    }
  }
}
