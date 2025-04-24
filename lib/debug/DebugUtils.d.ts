import Collider from "../collision/colliders/Collider.js";
import GameObject from "../core/GameObject.js";
declare class DebugUtils {
    drawColliders(gameObject: GameObject & {
        colliders: Collider[];
    }, color?: string): void;
}
declare const _default: DebugUtils;
export default _default;
//# sourceMappingURL=DebugUtils.d.ts.map