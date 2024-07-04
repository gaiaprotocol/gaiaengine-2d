import Screen from "./Screen.js";
export default class Camera {
    private screen;
    x: number;
    y: number;
    private _scale;
    constructor(screen: Screen);
    setPosition(x: number, y: number): void;
    set scale(value: number);
    get scale(): number;
}
//# sourceMappingURL=Camera.d.ts.map