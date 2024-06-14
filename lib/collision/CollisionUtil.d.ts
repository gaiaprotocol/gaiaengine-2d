import Transform from "../base/Transform.js";
import Collider from "./Collider.js";
declare class CollisionUtil {
    private checkBetween;
    private checkPointInRect;
    checkLineAndLine(asx: number, asy: number, aex: number, aey: number, bsx: number, bsy: number, bex: number, bey: number): boolean;
    private checkRectAndRect;
    check(ac: Collider, at: Transform, bc: Collider, bt: Transform): boolean;
}
declare const _default: CollisionUtil;
export default _default;
//# sourceMappingURL=CollisionUtil.d.ts.map