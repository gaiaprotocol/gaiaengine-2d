import Transform from "../core/Transform.js";
import Collider from "./collider/Collider.js";
import EllipseCollider from "./collider/EllipseCollider.js";
import PolygonCollider from "./collider/PolygonCollider.js";
import RectCollider from "./collider/RectCollider.js";
declare class CollisionUtils {
    checkCollision(colliderA: Collider, transformA: Transform, colliderB: Collider, transformB: Transform): boolean;
    private isValidTransform;
    isPointInsideRect(pointX: number, pointY: number, rect: RectCollider, transform: Transform): boolean;
    isPointInsideEllipse(pointX: number, pointY: number, ellipse: EllipseCollider, transform: Transform): boolean;
    isPointInsidePolygon(pointX: number, pointY: number, polygon: PolygonCollider, transform: Transform): boolean;
    isLineIntersectingLine(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): boolean;
    rectRectCollision(rectA: RectCollider, transformA: Transform, rectB: RectCollider, transformB: Transform): boolean;
    private getRectVertices;
    ellipseEllipseCollision(ellipseA: EllipseCollider, transformA: Transform, ellipseB: EllipseCollider, transformB: Transform): boolean;
    private approximateEllipse;
    rectEllipseCollision(rect: RectCollider, rectTransform: Transform, ellipse: EllipseCollider, ellipseTransform: Transform): boolean;
    ellipsePolygonCollision(ellipse: EllipseCollider, ellipseTransform: Transform, polygon: PolygonCollider, polygonTransform: Transform): boolean;
    rectPolygonCollision(rect: RectCollider, rectTransform: Transform, polygon: PolygonCollider, polygonTransform: Transform): boolean;
    polygonPolygonCollision(polygonA: PolygonCollider, transformA: Transform, polygonB: PolygonCollider, transformB: Transform): boolean;
    private transformPolygonPoints;
    private doPolygonsIntersect;
}
declare const _default: CollisionUtils;
export default _default;
//# sourceMappingURL=CollisionUtils.d.ts.map