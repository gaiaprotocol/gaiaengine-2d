import BaseCollider from "./BaseCollider.js";
import ColliderType from "./ColliderType.js";
export default interface PolygonCollider extends BaseCollider {
    type: ColliderType.Polygon;
    points: {
        x: number;
        y: number;
    }[];
}
//# sourceMappingURL=PolygonCollider.d.ts.map