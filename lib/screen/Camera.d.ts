import GameScreen from "./GameScreen.js";
export default class Camera {
    private screen;
    private _x;
    private _y;
    private _scale;
    constructor(screen: GameScreen);
    getX(): number;
    getY(): number;
    setPosition(x: number, y: number): void;
    set scale(value: number);
    get scale(): number;
}
//# sourceMappingURL=Camera.d.ts.map