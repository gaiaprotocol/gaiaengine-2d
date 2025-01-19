import Transform from "../core/Transform.js";
import CircleCollider from "./colliders/CircleCollider.js";
import Collider from "./colliders/Collider.js";
import EllipseCollider from "./colliders/EllipseCollider.js";
import PolygonCollider from "./colliders/PolygonCollider.js";
import RectCollider from "./colliders/RectCollider.js";
declare class CollisionChecker {
    checkCollision(colliderA: Collider, transformA: Transform, colliderB: Collider, transformB: Transform): boolean;
    private isValidTransform;
    isPointInsideRect(pointX: number, pointY: number, rect: RectCollider, transform: Transform): boolean;
    isPointInsideCircle(pointX: number, pointY: number, circle: CircleCollider, transform: Transform): boolean;
    isPointInsideEllipse(pointX: number, pointY: number, ellipse: EllipseCollider, transform: Transform): boolean;
    isPointInsidePolygon(pointX: number, pointY: number, polygon: PolygonCollider, transform: Transform): boolean;
    isLineIntersectingLine(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): boolean;
    private getRectVertices;
    private approximateCircle;
    private approximateEllipse;
    private transformPolygonPoints;
    private doPolygonsIntersect;
    rectRectCollision(rectA: RectCollider, transformA: Transform, rectB: RectCollider, transformB: Transform): boolean;
    rectCircleCollision(rect: RectCollider, rectTransform: Transform, circle: CircleCollider, circleTransform: Transform): boolean;
    rectEllipseCollision(rect: RectCollider, rectTransform: Transform, ellipse: EllipseCollider, ellipseTransform: Transform): boolean;
    rectPolygonCollision(rect: RectCollider, rectTransform: Transform, polygon: PolygonCollider, polygonTransform: Transform): boolean;
    circleCircleCollision(circleA: CircleCollider, transformA: Transform, circleB: CircleCollider, transformB: Transform): boolean;
    circleEllipseCollision(circle: CircleCollider, circleTransform: Transform, ellipse: EllipseCollider, ellipseTransform: Transform): boolean;
    circlePolygonCollision(circle: CircleCollider, circleTransform: Transform, polygon: PolygonCollider, polygonTransform: Transform): boolean;
    ellipseEllipseCollision(ellipseA: EllipseCollider, transformA: Transform, ellipseB: EllipseCollider, transformB: Transform): boolean;
    ellipsePolygonCollision(ellipse: EllipseCollider, ellipseTransform: Transform, polygon: PolygonCollider, polygonTransform: Transform): boolean;
    polygonPolygonCollision(polygonA: PolygonCollider, transformA: Transform, polygonB: PolygonCollider, transformB: Transform): boolean;
}
declare const _default: CollisionChecker;
export default _default;
//# sourceMappingURL=CollisionChecker.d.ts.map