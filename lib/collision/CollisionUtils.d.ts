import Transform from "../core/Transform.js";
import CircleCollider from "./collider/CircleCollider.js";
import Collider from "./collider/Collider.js";
import PolygonCollider from "./collider/PolygonCollider.js";
import RectCollider from "./collider/RectCollider.js";
declare class CollisionUtils {
    checkCollision(colliderA: Collider, transformA: Transform, colliderB: Collider, transformB: Transform): boolean;
    isPointInsideRect(pointX: number, pointY: number, rect: RectCollider, transform: Transform): boolean;
    isPointInsideCircle(pointX: number, pointY: number, circle: CircleCollider, transform: Transform): boolean;
    isPointInsidePolygon(pointX: number, pointY: number, polygon: PolygonCollider, transform: Transform): boolean;
    isLineIntersectingLine(ax1: number, ay1: number, ax2: number, ay2: number, bx1: number, by1: number, bx2: number, by2: number): boolean;
    isRectCollidingWithRect(rectA: RectCollider, transformA: Transform, rectB: RectCollider, transformB: Transform): boolean;
    private getRectVertices;
    isCircleCollidingWithCircle(circleA: CircleCollider, transformA: Transform, circleB: CircleCollider, transformB: Transform): boolean;
    isRectCollidingWithCircle(rect: RectCollider, rectTransform: Transform, circle: CircleCollider, circleTransform: Transform): boolean;
    isCircleCollidingWithPolygon(circle: CircleCollider, circleTransform: Transform, polygon: PolygonCollider, polygonTransform: Transform): boolean;
    private isLineIntersectingCircle;
    isRectCollidingWithPolygon(rect: RectCollider, rectTransform: Transform, polygon: PolygonCollider, polygonTransform: Transform): boolean;
    isPolygonCollidingWithPolygon(polygonA: PolygonCollider, transformA: Transform, polygonB: PolygonCollider, transformB: Transform): boolean;
    private transformPolygonPoints;
    private doPolygonsIntersect;
}
declare const _default: CollisionUtils;
export default _default;
//# sourceMappingURL=CollisionUtils.d.ts.map