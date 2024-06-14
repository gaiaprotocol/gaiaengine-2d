import Collidable from "../collision/Collidable.js";
export default class Movable extends Collidable {
    protected minX: number;
    protected maxX: number;
    private _speedX;
    protected accelX: number;
    protected toSpeedX: number | undefined;
    protected set speedX(speedX: number);
    protected get speedX(): number;
    protected mixY: number;
    protected maxY: number;
    private _speedY;
    protected accelY: number;
    protected toSpeedY: number | undefined;
    protected set speedY(speedY: number);
    protected get speedY(): number;
    protected onMinXReached?: () => void;
    protected onMaxXReached?: () => void;
    protected onMinYReached?: () => void;
    protected onMaxYReached?: () => void;
    protected update(deltaTime: number): void;
}
//# sourceMappingURL=Movable.d.ts.map