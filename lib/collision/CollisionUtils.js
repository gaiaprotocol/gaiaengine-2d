import ColliderType from "./collider/ColliderType.js";
class CollisionUtils {
    checkCollision(colliderA, transformA, colliderB, transformB) {
        if (colliderA.type === ColliderType.Rectangle &&
            colliderB.type === ColliderType.Rectangle) {
            return this.isRectCollidingWithRect(colliderA, transformA, colliderB, transformB);
        }
        else if (colliderA.type === ColliderType.Circle &&
            colliderB.type === ColliderType.Circle) {
            return this.isCircleCollidingWithCircle(colliderA, transformA, colliderB, transformB);
        }
        else if (colliderA.type === ColliderType.Rectangle &&
            colliderB.type === ColliderType.Circle) {
            return this.isRectCollidingWithCircle(colliderA, transformA, colliderB, transformB);
        }
        else if (colliderA.type === ColliderType.Circle &&
            colliderB.type === ColliderType.Rectangle) {
            return this.isRectCollidingWithCircle(colliderB, transformB, colliderA, transformA);
        }
        else if (colliderA.type === ColliderType.Polygon &&
            colliderB.type === ColliderType.Circle) {
            return this.isCircleCollidingWithPolygon(colliderB, transformB, colliderA, transformA);
        }
        else if (colliderA.type === ColliderType.Circle &&
            colliderB.type === ColliderType.Polygon) {
            return this.isCircleCollidingWithPolygon(colliderA, transformA, colliderB, transformB);
        }
        else if (colliderA.type === ColliderType.Rectangle &&
            colliderB.type === ColliderType.Polygon) {
            return this.isRectCollidingWithPolygon(colliderA, transformA, colliderB, transformB);
        }
        else if (colliderA.type === ColliderType.Polygon &&
            colliderB.type === ColliderType.Rectangle) {
            return this.isRectCollidingWithPolygon(colliderB, transformB, colliderA, transformA);
        }
        else if (colliderA.type === ColliderType.Polygon &&
            colliderB.type === ColliderType.Polygon) {
            return this.isPolygonCollidingWithPolygon(colliderA, transformA, colliderB, transformB);
        }
        return false;
    }
    isPointInsideRect(pointX, pointY, rect, transform) {
        const cos = Math.cos(transform.rotation);
        const sin = Math.sin(transform.rotation);
        const rectCenterX = transform.x + rect.x * transform.scaleX;
        const rectCenterY = transform.y + rect.y * transform.scaleY;
        const dx = pointX - rectCenterX;
        const dy = pointY - rectCenterY;
        const localX = cos * dx + sin * dy;
        const localY = -sin * dx + cos * dy;
        const halfWidth = (rect.width * transform.scaleX) / 2;
        const halfHeight = (rect.height * transform.scaleY) / 2;
        return (localX >= -halfWidth &&
            localX <= halfWidth &&
            localY >= -halfHeight &&
            localY <= halfHeight);
    }
    isPointInsideCircle(pointX, pointY, circle, transform) {
        const circleCenterX = transform.x + circle.x * transform.scaleX;
        const circleCenterY = transform.y + circle.y * transform.scaleY;
        const deltaX = pointX - circleCenterX;
        const deltaY = pointY - circleCenterY;
        const distanceSquared = deltaX * deltaX + deltaY * deltaY;
        const radius = circle.radius * ((transform.scaleX + transform.scaleY) / 2);
        return distanceSquared <= radius * radius;
    }
    isPointInsidePolygon(pointX, pointY, polygon, transform) {
        const transformedPoints = this.transformPolygonPoints(polygon, transform);
        let inside = false;
        const length = transformedPoints.length;
        for (let i = 0, j = length - 1; i < length; j = i++) {
            const xi = transformedPoints[i].x;
            const yi = transformedPoints[i].y;
            const xj = transformedPoints[j].x;
            const yj = transformedPoints[j].y;
            const intersect = yi > pointY !== yj > pointY &&
                pointX < ((xj - xi) * (pointY - yi)) / (yj - yi) + xi;
            if (intersect)
                inside = !inside;
        }
        return inside;
    }
    isLineIntersectingLine(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
        const denominator = (ax2 - ax1) * (by2 - by1) - (ay2 - ay1) * (bx2 - bx1);
        if (denominator === 0) {
            return false;
        }
        const ua = ((bx2 - bx1) * (ay1 - by1) - (by2 - by1) * (ax1 - bx1)) /
            denominator;
        const ub = ((ax2 - ax1) * (ay1 - by1) - (ay2 - ay1) * (ax1 - bx1)) /
            denominator;
        return ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1;
    }
    isRectCollidingWithRect(rectA, transformA, rectB, transformB) {
        const pointsA = this.getRectVertices(rectA, transformA);
        const pointsB = this.getRectVertices(rectB, transformB);
        return this.doPolygonsIntersect(pointsA, pointsB);
    }
    getRectVertices(rect, transform) {
        const halfWidth = (rect.width * transform.scaleX) / 2;
        const halfHeight = (rect.height * transform.scaleY) / 2;
        const cos = Math.cos(transform.rotation);
        const sin = Math.sin(transform.rotation);
        const centerX = transform.x + rect.x * transform.scaleX;
        const centerY = transform.y + rect.y * transform.scaleY;
        const vertices = [
            { x: -halfWidth, y: -halfHeight },
            { x: halfWidth, y: -halfHeight },
            { x: halfWidth, y: halfHeight },
            { x: -halfWidth, y: halfHeight },
        ];
        return vertices.map((vertex) => {
            const x = vertex.x;
            const y = vertex.y;
            return {
                x: cos * x - sin * y + centerX,
                y: sin * x + cos * y + centerY,
            };
        });
    }
    isCircleCollidingWithCircle(circleA, transformA, circleB, transformB) {
        const centerAX = transformA.x + circleA.x * transformA.scaleX;
        const centerAY = transformA.y + circleA.y * transformA.scaleY;
        const centerBX = transformB.x + circleB.x * transformB.scaleX;
        const centerBY = transformB.y + circleB.y * transformB.scaleY;
        const deltaX = centerAX - centerBX;
        const deltaY = centerAY - centerBY;
        const radiusA = circleA.radius *
            ((transformA.scaleX + transformA.scaleY) / 2);
        const radiusB = circleB.radius *
            ((transformB.scaleX + transformB.scaleY) / 2);
        const distanceSquared = deltaX * deltaX + deltaY * deltaY;
        const radiusSum = radiusA + radiusB;
        return distanceSquared <= radiusSum * radiusSum;
    }
    isRectCollidingWithCircle(rect, rectTransform, circle, circleTransform) {
        const cos = Math.cos(-rectTransform.rotation);
        const sin = Math.sin(-rectTransform.rotation);
        const rectCenterX = rectTransform.x + rect.x * rectTransform.scaleX;
        const rectCenterY = rectTransform.y + rect.y * rectTransform.scaleY;
        const circleCenterX = circleTransform.x + circle.x * circleTransform.scaleX;
        const circleCenterY = circleTransform.y + circle.y * circleTransform.scaleY;
        const dx = circleCenterX - rectCenterX;
        const dy = circleCenterY - rectCenterY;
        const localX = cos * dx + sin * dy;
        const localY = -sin * dx + cos * dy;
        const halfWidth = (rect.width * rectTransform.scaleX) / 2;
        const halfHeight = (rect.height * rectTransform.scaleY) / 2;
        const closestX = Math.max(-halfWidth, Math.min(localX, halfWidth));
        const closestY = Math.max(-halfHeight, Math.min(localY, halfHeight));
        const distanceX = localX - closestX;
        const distanceY = localY - closestY;
        const distanceSquared = distanceX * distanceX + distanceY * distanceY;
        const radius = circle.radius *
            ((circleTransform.scaleX + circleTransform.scaleY) / 2);
        return distanceSquared <= radius * radius;
    }
    isCircleCollidingWithPolygon(circle, circleTransform, polygon, polygonTransform) {
        const circleCenterX = circleTransform.x + circle.x * circleTransform.scaleX;
        const circleCenterY = circleTransform.y + circle.y * circleTransform.scaleY;
        const radius = circle.radius *
            ((circleTransform.scaleX + circleTransform.scaleY) / 2);
        const transformedPoints = this.transformPolygonPoints(polygon, polygonTransform);
        if (this.isPointInsidePolygon(circleCenterX, circleCenterY, polygon, polygonTransform)) {
            return true;
        }
        const length = transformedPoints.length;
        for (let i = 0, j = length - 1; i < length; j = i++) {
            const x1 = transformedPoints[j].x;
            const y1 = transformedPoints[j].y;
            const x2 = transformedPoints[i].x;
            const y2 = transformedPoints[i].y;
            if (this.isLineIntersectingCircle(x1, y1, x2, y2, circleCenterX, circleCenterY, radius)) {
                return true;
            }
        }
        return false;
    }
    isLineIntersectingCircle(x1, y1, x2, y2, circleX, circleY, radius) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const fx = x1 - circleX;
        const fy = y1 - circleY;
        const a = dx * dx + dy * dy;
        const b = 2 * (fx * dx + fy * dy);
        const c = fx * fx + fy * fy - radius * radius;
        let discriminant = b * b - 4 * a * c;
        if (discriminant < 0) {
            return false;
        }
        discriminant = Math.sqrt(discriminant);
        const t1 = (-b - discriminant) / (2 * a);
        const t2 = (-b + discriminant) / (2 * a);
        if ((t1 >= 0 && t1 <= 1) || (t2 >= 0 && t2 <= 1)) {
            return true;
        }
        return false;
    }
    isRectCollidingWithPolygon(rect, rectTransform, polygon, polygonTransform) {
        const rectVertices = this.getRectVertices(rect, rectTransform);
        const polygonVertices = this.transformPolygonPoints(polygon, polygonTransform);
        for (const vertex of rectVertices) {
            if (this.isPointInsidePolygon(vertex.x, vertex.y, polygon, polygonTransform)) {
                return true;
            }
        }
        for (const vertex of polygonVertices) {
            if (this.isPointInsideRect(vertex.x, vertex.y, rect, rectTransform)) {
                return true;
            }
        }
        if (this.doPolygonsIntersect(rectVertices, polygonVertices)) {
            return true;
        }
        return false;
    }
    isPolygonCollidingWithPolygon(polygonA, transformA, polygonB, transformB) {
        const verticesA = this.transformPolygonPoints(polygonA, transformA);
        const verticesB = this.transformPolygonPoints(polygonB, transformB);
        return this.doPolygonsIntersect(verticesA, verticesB);
    }
    transformPolygonPoints(polygon, transform) {
        const cos = Math.cos(transform.rotation);
        const sin = Math.sin(transform.rotation);
        const centerX = transform.x + polygon.x * transform.scaleX;
        const centerY = transform.y + polygon.y * transform.scaleY;
        return polygon.points.map((point) => {
            const x = point.x * transform.scaleX;
            const y = point.y * transform.scaleY;
            return {
                x: cos * x - sin * y + centerX,
                y: sin * x + cos * y + centerY,
            };
        });
    }
    doPolygonsIntersect(verticesA, verticesB) {
        const polygons = [verticesA, verticesB];
        for (let i = 0; i < polygons.length; i++) {
            const polygon = polygons[i];
            for (let i1 = 0; i1 < polygon.length; i1++) {
                const i2 = (i1 + 1) % polygon.length;
                const p1 = polygon[i1];
                const p2 = polygon[i2];
                const normal = { x: p2.y - p1.y, y: p1.x - p2.x };
                let minA = null;
                let maxA = null;
                for (const p of verticesA) {
                    const projected = normal.x * p.x + normal.y * p.y;
                    if (minA === null || projected < minA) {
                        minA = projected;
                    }
                    if (maxA === null || projected > maxA) {
                        maxA = projected;
                    }
                }
                let minB = null;
                let maxB = null;
                for (const p of verticesB) {
                    const projected = normal.x * p.x + normal.y * p.y;
                    if (minB === null || projected < minB) {
                        minB = projected;
                    }
                    if (maxB === null || projected > maxB) {
                        maxB = projected;
                    }
                }
                if (maxA < minB || maxB < minA) {
                    return false;
                }
            }
        }
        return true;
    }
}
export default new CollisionUtils();
//# sourceMappingURL=CollisionUtils.js.map