import Transform from "../core/Transform.js";
import Collider from "./collider/Collider.js";
declare class CollisionUtil {
    private checkBetween;
    checkPointInRect(px: number, py: number, rx: number, ry: number, rw: number, rh: number, rsin: number, rcos: number): boolean;
    checkLineAndLine(asx: number, asy: number, aex: number, aey: number, bsx: number, bsy: number, bex: number, bey: number): boolean;
    private checkRectAndRect;
    check(ac: Collider, at: Transform, bc: Collider, bt: Transform): boolean;
}
declare const _default: CollisionUtil;
export default _default;
//# sourceMappingURL=CollisionUtil.d.ts.map