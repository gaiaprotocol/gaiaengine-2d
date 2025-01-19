import ColliderType from "./colliders/ColliderType.js";
class CollisionChecker {
    checkCollision(colliderA, transformA, colliderB, transformB) {
        if (!this.isValidTransform(transformA) ||
            !this.isValidTransform(transformB)) {
            return false;
        }
        if (colliderA.type === ColliderType.Rectangle) {
            if (colliderB.type === ColliderType.Rectangle) {
                return this.rectRectCollision(colliderA, transformA, colliderB, transformB);
            }
            else if (colliderB.type === ColliderType.Circle) {
                return this.rectCircleCollision(colliderA, transformA, colliderB, transformB);
            }
            else if (colliderB.type === ColliderType.Ellipse) {
                return this.rectEllipseCollision(colliderA, transformA, colliderB, transformB);
            }
            else if (colliderB.type === ColliderType.Polygon) {
                return this.rectPolygonCollision(colliderA, transformA, colliderB, transformB);
            }
            else {
                return false;
            }
        }
        else if (colliderA.type === ColliderType.Circle) {
            if (colliderB.type === ColliderType.Rectangle) {
                return this.rectCircleCollision(colliderB, transformB, colliderA, transformA);
            }
            else if (colliderB.type === ColliderType.Circle) {
                return this.circleCircleCollision(colliderA, transformA, colliderB, transformB);
            }
            else if (colliderB.type === ColliderType.Ellipse) {
                return this.circleEllipseCollision(colliderA, transformA, colliderB, transformB);
            }
            else if (colliderB.type === ColliderType.Polygon) {
                return this.circlePolygonCollision(colliderA, transformA, colliderB, transformB);
            }
            else {
                return false;
            }
        }
        else if (colliderA.type === ColliderType.Ellipse) {
            if (colliderB.type === ColliderType.Rectangle) {
                return this.rectEllipseCollision(colliderB, transformB, colliderA, transformA);
            }
            else if (colliderB.type === ColliderType.Circle) {
                return this.circleEllipseCollision(colliderB, transformB, colliderA, transformA);
            }
            else if (colliderB.type === ColliderType.Ellipse) {
                return this.ellipseEllipseCollision(colliderA, transformA, colliderB, transformB);
            }
            else if (colliderB.type === ColliderType.Polygon) {
                return this.ellipsePolygonCollision(colliderA, transformA, colliderB, transformB);
            }
            else {
                return false;
            }
        }
        else if (colliderA.type === ColliderType.Polygon) {
            if (colliderB.type === ColliderType.Rectangle) {
                return this.rectPolygonCollision(colliderB, transformB, colliderA, transformA);
            }
            else if (colliderB.type === ColliderType.Circle) {
                return this.circlePolygonCollision(colliderB, transformB, colliderA, transformA);
            }
            else if (colliderB.type === ColliderType.Ellipse) {
                return this.ellipsePolygonCollision(colliderB, transformB, colliderA, transformA);
            }
            else if (colliderB.type === ColliderType.Polygon) {
                return this.polygonPolygonCollision(colliderA, transformA, colliderB, transformB);
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    isValidTransform(transform) {
        return (isFinite(transform.x) &&
            isFinite(transform.y) &&
            isFinite(transform.scaleX) &&
            isFinite(transform.scaleY) &&
            isFinite(transform.rotation));
    }
    isPointInsideRect(pointX, pointY, rect, transform) {
        if (!isFinite(pointX) ||
            !isFinite(pointY) ||
            !this.isValidTransform(transform)) {
            return false;
        }
        const rectCenterX = transform.x + rect.x * transform.scaleX;
        const rectCenterY = transform.y + rect.y * transform.scaleY;
        if (!isFinite(rectCenterX) || !isFinite(rectCenterY)) {
            return false;
        }
        const dx = pointX - rectCenterX;
        const dy = pointY - rectCenterY;
        const cos = Math.cos(-transform.rotation);
        const sin = Math.sin(-transform.rotation);
        const localX = dx * cos - dy * sin;
        const localY = dx * sin + dy * cos;
        const halfWidth = (rect.width * transform.scaleX) / 2;
        const halfHeight = (rect.height * transform.scaleY) / 2;
        return (localX >= -halfWidth &&
            localX <= halfWidth &&
            localY >= -halfHeight &&
            localY <= halfHeight);
    }
    isPointInsideCircle(pointX, pointY, circle, transform) {
        if (!isFinite(pointX) ||
            !isFinite(pointY) ||
            !this.isValidTransform(transform)) {
            return false;
        }
        const circleCenterX = transform.x + circle.x * transform.scaleX;
        const circleCenterY = transform.y + circle.y * transform.scaleY;
        if (!isFinite(circleCenterX) || !isFinite(circleCenterY)) {
            return false;
        }
        const dx = pointX - circleCenterX;
        const dy = pointY - circleCenterY;
        const avgScale = (transform.scaleX + transform.scaleY) * 0.5;
        const scaledRadius = circle.radius * avgScale;
        return dx * dx + dy * dy <= scaledRadius * scaledRadius;
    }
    isPointInsideEllipse(pointX, pointY, ellipse, transform) {
        if (!isFinite(pointX) ||
            !isFinite(pointY) ||
            !this.isValidTransform(transform)) {
            return false;
        }
        const ellipseCenterX = transform.x + ellipse.x * transform.scaleX;
        const ellipseCenterY = transform.y + ellipse.y * transform.scaleY;
        if (!isFinite(ellipseCenterX) || !isFinite(ellipseCenterY)) {
            return false;
        }
        const dx = pointX - ellipseCenterX;
        const dy = pointY - ellipseCenterY;
        const cos = Math.cos(-transform.rotation);
        const sin = Math.sin(-transform.rotation);
        const localX = dx * cos - dy * sin;
        const localY = dx * sin + dy * cos;
        const a = (ellipse.width * transform.scaleX) / 2;
        const b = (ellipse.height * transform.scaleY) / 2;
        const value = (localX * localX) / (a * a) + (localY * localY) / (b * b);
        return value <= 1;
    }
    isPointInsidePolygon(pointX, pointY, polygon, transform) {
        if (!isFinite(pointX) ||
            !isFinite(pointY) ||
            !this.isValidTransform(transform)) {
            return false;
        }
        const transformedPoints = this.transformPolygonPoints(polygon, transform);
        if (transformedPoints.length === 0) {
            return false;
        }
        let inside = false;
        for (let i = 0, j = transformedPoints.length - 1; i < transformedPoints.length; j = i++) {
            const xi = transformedPoints[i].x;
            const yi = transformedPoints[i].y;
            const xj = transformedPoints[j].x;
            const yj = transformedPoints[j].y;
            const intersect = yi > pointY !== yj > pointY &&
                pointX <
                    ((xj - xi) * (pointY - yi)) / (yj - yi + Number.EPSILON) + xi;
            if (intersect)
                inside = !inside;
        }
        return inside;
    }
    isLineIntersectingLine(x1, y1, x2, y2, x3, y3, x4, y4) {
        if (![x1, y1, x2, y2, x3, y3, x4, y4].every((val) => isFinite(val))) {
            return false;
        }
        const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
        if (denom === 0) {
            return false;
        }
        const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
        const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;
        return ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1;
    }
    getRectVertices(rect, transform) {
        if (!this.isValidTransform(transform)) {
            return [];
        }
        const halfWidth = (rect.width * transform.scaleX) / 2;
        const halfHeight = (rect.height * transform.scaleY) / 2;
        const localVertices = [
            { x: -halfWidth, y: -halfHeight },
            { x: halfWidth, y: -halfHeight },
            { x: halfWidth, y: halfHeight },
            { x: -halfWidth, y: halfHeight },
        ];
        const cos = Math.cos(transform.rotation);
        const sin = Math.sin(transform.rotation);
        const centerX = transform.x + rect.x * transform.scaleX;
        const centerY = transform.y + rect.y * transform.scaleY;
        if (!isFinite(centerX) || !isFinite(centerY)) {
            return [];
        }
        return localVertices.map((vertex) => {
            const x = vertex.x * cos - vertex.y * sin + centerX;
            const y = vertex.x * sin + vertex.y * cos + centerY;
            if (!isFinite(x) || !isFinite(y)) {
                return { x: 0, y: 0 };
            }
            return { x, y };
        });
    }
    approximateCircle(circle, transform, numSides) {
        if (!this.isValidTransform(transform)) {
            return [];
        }
        const centerX = transform.x + circle.x * transform.scaleX;
        const centerY = transform.y + circle.y * transform.scaleY;
        if (!isFinite(centerX) || !isFinite(centerY)) {
            return [];
        }
        const avgScale = (transform.scaleX + transform.scaleY) * 0.5;
        const radius = circle.radius * avgScale;
        const radianStep = (Math.PI * 2) / numSides;
        const result = [];
        for (let i = 0; i < numSides; i++) {
            const rad = i * radianStep;
            const x = radius * Math.cos(rad);
            const y = radius * Math.sin(rad);
            const worldX = x + centerX;
            const worldY = y + centerY;
            if (isFinite(worldX) && isFinite(worldY)) {
                result.push({ x: worldX, y: worldY });
            }
        }
        return result;
    }
    approximateEllipse(ellipse, transform, numSides) {
        if (!this.isValidTransform(transform)) {
            return [];
        }
        const centerX = transform.x + ellipse.x * transform.scaleX;
        const centerY = transform.y + ellipse.y * transform.scaleY;
        const a = (ellipse.width * transform.scaleX) / 2;
        const b = (ellipse.height * transform.scaleY) / 2;
        const rotation = transform.rotation;
        if (!isFinite(centerX) || !isFinite(centerY)) {
            return [];
        }
        const cosR = Math.cos(rotation);
        const sinR = Math.sin(rotation);
        const step = (Math.PI * 2) / numSides;
        const result = [];
        for (let i = 0; i < numSides; i++) {
            const rad = i * step;
            const x = a * Math.cos(rad);
            const y = b * Math.sin(rad);
            const rx = x * cosR - y * sinR + centerX;
            const ry = x * sinR + y * cosR + centerY;
            if (isFinite(rx) && isFinite(ry)) {
                result.push({ x: rx, y: ry });
            }
        }
        return result;
    }
    transformPolygonPoints(polygon, transform) {
        if (!this.isValidTransform(transform)) {
            return [];
        }
        const cos = Math.cos(transform.rotation);
        const sin = Math.sin(transform.rotation);
        const centerX = transform.x + polygon.x * transform.scaleX;
        const centerY = transform.y + polygon.y * transform.scaleY;
        if (!isFinite(centerX) || !isFinite(centerY)) {
            return [];
        }
        return polygon.points
            .map((point) => {
            const x = point.x * transform.scaleX;
            const y = point.y * transform.scaleY;
            const worldX = x * cos - y * sin + centerX;
            const worldY = x * sin + y * cos + centerY;
            if (!isFinite(worldX) || !isFinite(worldY)) {
                return null;
            }
            return { x: worldX, y: worldY };
        })
            .filter((v) => v !== null);
    }
    doPolygonsIntersect(verticesA, verticesB) {
        if (verticesA.length === 0 || verticesB.length === 0) {
            return false;
        }
        const polygons = [verticesA, verticesB];
        for (let i = 0; i < polygons.length; i++) {
            const polygon = polygons[i];
            for (let j = 0; j < polygon.length; j++) {
                const k = (j + 1) % polygon.length;
                const edge = {
                    x: polygon[k].x - polygon[j].x,
                    y: polygon[k].y - polygon[j].y,
                };
                const normal = { x: -edge.y, y: edge.x };
                let minA = Infinity, maxA = -Infinity;
                for (const v of verticesA) {
                    const proj = normal.x * v.x + normal.y * v.y;
                    if (proj < minA)
                        minA = proj;
                    if (proj > maxA)
                        maxA = proj;
                }
                let minB = Infinity, maxB = -Infinity;
                for (const v of verticesB) {
                    const proj = normal.x * v.x + normal.y * v.y;
                    if (proj < minB)
                        minB = proj;
                    if (proj > maxB)
                        maxB = proj;
                }
                if (maxA < minB || maxB < minA) {
                    return false;
                }
            }
        }
        return true;
    }
    rectRectCollision(rectA, transformA, rectB, transformB) {
        const verticesA = this.getRectVertices(rectA, transformA);
        const verticesB = this.getRectVertices(rectB, transformB);
        if (verticesA.length === 0 || verticesB.length === 0) {
            return false;
        }
        return this.doPolygonsIntersect(verticesA, verticesB);
    }
    rectCircleCollision(rect, rectTransform, circle, circleTransform) {
        if (!this.isValidTransform(rectTransform) ||
            !this.isValidTransform(circleTransform)) {
            return false;
        }
        const circleCenterX = circleTransform.x + circle.x * circleTransform.scaleX;
        const circleCenterY = circleTransform.y + circle.y * circleTransform.scaleY;
        const avgScale = (circleTransform.scaleX + circleTransform.scaleY) * 0.5;
        const circleRadius = circle.radius * avgScale;
        const rectCenterX = rectTransform.x + rect.x * rectTransform.scaleX;
        const rectCenterY = rectTransform.y + rect.y * rectTransform.scaleY;
        const halfW = (rect.width * rectTransform.scaleX) / 2;
        const halfH = (rect.height * rectTransform.scaleY) / 2;
        const dx = circleCenterX - rectCenterX;
        const dy = circleCenterY - rectCenterY;
        const cos = Math.cos(-rectTransform.rotation);
        const sin = Math.sin(-rectTransform.rotation);
        const localX = dx * cos - dy * sin;
        const localY = dx * sin + dy * cos;
        let clampedX = localX;
        let clampedY = localY;
        if (clampedX < -halfW)
            clampedX = -halfW;
        if (clampedX > halfW)
            clampedX = halfW;
        if (clampedY < -halfH)
            clampedY = -halfH;
        if (clampedY > halfH)
            clampedY = halfH;
        const distX = localX - clampedX;
        const distY = localY - clampedY;
        const distSq = distX * distX + distY * distY;
        return distSq <= circleRadius * circleRadius;
    }
    rectEllipseCollision(rect, rectTransform, ellipse, ellipseTransform) {
        const ellipseVertices = this.approximateEllipse(ellipse, ellipseTransform, 16);
        const rectVertices = this.getRectVertices(rect, rectTransform);
        if (ellipseVertices.length === 0 || rectVertices.length === 0) {
            return false;
        }
        return this.doPolygonsIntersect(rectVertices, ellipseVertices);
    }
    rectPolygonCollision(rect, rectTransform, polygon, polygonTransform) {
        const rectVertices = this.getRectVertices(rect, rectTransform);
        const polygonVertices = this.transformPolygonPoints(polygon, polygonTransform);
        if (rectVertices.length === 0 || polygonVertices.length === 0) {
            return false;
        }
        return this.doPolygonsIntersect(rectVertices, polygonVertices);
    }
    circleCircleCollision(circleA, transformA, circleB, transformB) {
        if (!this.isValidTransform(transformA) ||
            !this.isValidTransform(transformB)) {
            return false;
        }
        const centerAx = transformA.x + circleA.x * transformA.scaleX;
        const centerAy = transformA.y + circleA.y * transformA.scaleY;
        const centerBx = transformB.x + circleB.x * transformB.scaleX;
        const centerBy = transformB.y + circleB.y * transformB.scaleY;
        if (!isFinite(centerAx) || !isFinite(centerAy) ||
            !isFinite(centerBx) || !isFinite(centerBy)) {
            return false;
        }
        const avgScaleA = (transformA.scaleX + transformA.scaleY) * 0.5;
        const avgScaleB = (transformB.scaleX + transformB.scaleY) * 0.5;
        const radiusA = circleA.radius * avgScaleA;
        const radiusB = circleB.radius * avgScaleB;
        const dx = centerBx - centerAx;
        const dy = centerBy - centerAy;
        const distSq = dx * dx + dy * dy;
        const radiusSum = radiusA + radiusB;
        return distSq <= radiusSum * radiusSum;
    }
    circleEllipseCollision(circle, circleTransform, ellipse, ellipseTransform) {
        const circlePoints = this.approximateCircle(circle, circleTransform, 16);
        const ellipsePoints = this.approximateEllipse(ellipse, ellipseTransform, 16);
        if (circlePoints.length === 0 || ellipsePoints.length === 0) {
            return false;
        }
        return this.doPolygonsIntersect(circlePoints, ellipsePoints);
    }
    circlePolygonCollision(circle, circleTransform, polygon, polygonTransform) {
        if (!this.isValidTransform(circleTransform) ||
            !this.isValidTransform(polygonTransform)) {
            return false;
        }
        const circleCenterX = circleTransform.x + circle.x * circleTransform.scaleX;
        const circleCenterY = circleTransform.y + circle.y * circleTransform.scaleY;
        const avgScale = (circleTransform.scaleX + circleTransform.scaleY) * 0.5;
        const circleRadius = circle.radius * avgScale;
        const polyPoints = this.transformPolygonPoints(polygon, polygonTransform);
        if (polyPoints.length === 0)
            return false;
        if (this.isPointInPolygon(circleCenterX, circleCenterY, polyPoints)) {
            return true;
        }
        for (let i = 0; i < polyPoints.length; i++) {
            const j = (i + 1) % polyPoints.length;
            const p1 = polyPoints[i];
            const p2 = polyPoints[j];
            const dist = this.distancePointToSegment(circleCenterX, circleCenterY, p1.x, p1.y, p2.x, p2.y);
            if (dist <= circleRadius) {
                return true;
            }
        }
        return false;
    }
    isPointInPolygon(x, y, points) {
        let inside = false;
        for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
            const xi = points[i].x, yi = points[i].y;
            const xj = points[j].x, yj = points[j].y;
            const intersect = yi > y !== yj > y &&
                x < ((xj - xi) * (y - yi)) / (yj - yi + Number.EPSILON) + xi;
            if (intersect)
                inside = !inside;
        }
        return inside;
    }
    distancePointToSegment(px, py, x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        if (dx === 0 && dy === 0) {
            const vx = px - x1;
            const vy = py - y1;
            return Math.sqrt(vx * vx + vy * vy);
        }
        const t = ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy);
        if (t < 0) {
            const vx = px - x1;
            const vy = py - y1;
            return Math.sqrt(vx * vx + vy * vy);
        }
        else if (t > 1) {
            const vx = px - x2;
            const vy = py - y2;
            return Math.sqrt(vx * vx + vy * vy);
        }
        else {
            const projx = x1 + t * dx;
            const projy = y1 + t * dy;
            const vx = px - projx;
            const vy = py - projy;
            return Math.sqrt(vx * vx + vy * vy);
        }
    }
    ellipseEllipseCollision(ellipseA, transformA, ellipseB, transformB) {
        const polygonA = this.approximateEllipse(ellipseA, transformA, 16);
        const polygonB = this.approximateEllipse(ellipseB, transformB, 16);
        if (polygonA.length === 0 || polygonB.length === 0) {
            return false;
        }
        return this.doPolygonsIntersect(polygonA, polygonB);
    }
    ellipsePolygonCollision(ellipse, ellipseTransform, polygon, polygonTransform) {
        const ellipsePoints = this.approximateEllipse(ellipse, ellipseTransform, 16);
        const polygonPoints = this.transformPolygonPoints(polygon, polygonTransform);
        if (ellipsePoints.length === 0 || polygonPoints.length === 0) {
            return false;
        }
        return this.doPolygonsIntersect(ellipsePoints, polygonPoints);
    }
    polygonPolygonCollision(polygonA, transformA, polygonB, transformB) {
        const verticesA = this.transformPolygonPoints(polygonA, transformA);
        const verticesB = this.transformPolygonPoints(polygonB, transformB);
        if (verticesA.length === 0 || verticesB.length === 0) {
            return false;
        }
        return this.doPolygonsIntersect(verticesA, verticesB);
    }
}
export default new CollisionChecker();
//# sourceMappingURL=CollisionChecker.js.map