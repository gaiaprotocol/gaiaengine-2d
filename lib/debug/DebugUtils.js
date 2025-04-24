import ColliderType from "../collision/colliders/ColliderType.js";
import CircleNode from "../shapes/CircleNode.js";
class DebugUtils {
    drawColliders(gameObject, color = "#00ff00") {
        for (const collider of gameObject.colliders) {
            if (collider.type === ColliderType.Circle) {
                gameObject.append(new CircleNode(collider.x, collider.y, collider.radius, undefined, { color, width: 1 / gameObject.scale }));
            }
        }
    }
}
export default new DebugUtils();
//# sourceMappingURL=DebugUtils.js.map