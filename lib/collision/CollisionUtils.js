import ColliderType from "./collider/ColliderType.js";
class CollisionUtils {
    checkCollision(colliderA, transformA, colliderB, transformB) {
        if (colliderA.type === ColliderType.Rectangle) {
            if (colliderB.type === ColliderType.Rectangle) {
                return this.rectRectCollision(colliderA, transformA, colliderB, transformB);
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
        else if (colliderA.type === ColliderType.Ellipse) {
            if (colliderB.type === ColliderType.Rectangle) {
                return this.rectEllipseCollision(colliderB, transformB, colliderA, transformA);
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
    isPointInsideRect(pointX, pointY, rect, transform) {
        const rectCenterX = transform.x + rect.x * transform.scaleX;
        const rectCenterY = transform.y + rect.y * transform.scaleY;
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
    isPointInsideEllipse(pointX, pointY, ellipse, transform) {
        const ellipseCenterX = transform.x + ellipse.x * transform.scaleX;
        const ellipseCenterY = transform.y + ellipse.y * transform.scaleY;
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
        const transformedPoints = this.transformPolygonPoints(polygon, transform);
        let inside = false;
        for (let i = 0, j = transformedPoints.length - 1; i < transformedPoints.length; j = i++) {
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
    isLineIntersectingLine(x1, y1, x2, y2, x3, y3, x4, y4) {
        const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
        if (denom === 0) {
            return false;
        }
        const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
        const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;
        return ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1;
    }
    rectRectCollision(rectA, transformA, rectB, transformB) {
        const verticesA = this.getRectVertices(rectA, transformA);
        const verticesB = this.getRectVertices(rectB, transformB);
        return this.doPolygonsIntersect(verticesA, verticesB);
    }
    getRectVertices(rect, transform) {
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
        return localVertices.map((vertex) => {
            const x = vertex.x * cos - vertex.y * sin + centerX;
            const y = vertex.x * sin + vertex.y * cos + centerY;
            return { x, y };
        });
    }
    ellipseEllipseCollision(ellipseA, transformA, ellipseB, transformB) {
        const polygonA = this.approximateEllipse(ellipseA, transformA, 16);
        const polygonB = this.approximateEllipse(ellipseB, transformB, 16);
        return this.doPolygonsIntersect(polygonA, polygonB);
    }
    approximateEllipse(ellipse, transform, numSides) {
        const centerX = transform.x + ellipse.x * transform.scaleX;
        const centerY = transform.y + ellipse.y * transform.scaleY;
        const a = (ellipse.width * transform.scaleX) / 2;
        const b = (ellipse.height * transform.scaleY) / 2;
        const angleStep = (Math.PI * 2) / numSides;
        const rotation = transform.rotation;
        const cosRotation = Math.cos(rotation);
        const sinRotation = Math.sin(rotation);
        const vertices = [];
        for (let i = 0; i < numSides; i++) {
            const angle = i * angleStep;
            const x = a * Math.cos(angle);
            const y = b * Math.sin(angle);
            const rotatedX = x * cosRotation - y * sinRotation + centerX;
            const rotatedY = x * sinRotation + y * cosRotation + centerY;
            vertices.push({ x: rotatedX, y: rotatedY });
        }
        return vertices;
    }
    rectEllipseCollision(rect, rectTransform, ellipse, ellipseTransform) {
        const ellipseVertices = this.approximateEllipse(ellipse, ellipseTransform, 16);
        const rectVertices = this.getRectVertices(rect, rectTransform);
        return this.doPolygonsIntersect(rectVertices, ellipseVertices);
    }
    ellipsePolygonCollision(ellipse, ellipseTransform, polygon, polygonTransform) {
        const ellipseVertices = this.approximateEllipse(ellipse, ellipseTransform, 16);
        const polygonVertices = this.transformPolygonPoints(polygon, polygonTransform);
        return this.doPolygonsIntersect(ellipseVertices, polygonVertices);
    }
    rectPolygonCollision(rect, rectTransform, polygon, polygonTransform) {
        const rectVertices = this.getRectVertices(rect, rectTransform);
        const polygonVertices = this.transformPolygonPoints(polygon, polygonTransform);
        return this.doPolygonsIntersect(rectVertices, polygonVertices);
    }
    polygonPolygonCollision(polygonA, transformA, polygonB, transformB) {
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
            const transformedX = x * cos - y * sin + centerX;
            const transformedY = x * sin + y * cos + centerY;
            return { x: transformedX, y: transformedY };
        });
    }
    doPolygonsIntersect(verticesA, verticesB) {
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
                let minA = Infinity;
                let maxA = -Infinity;
                for (const vertex of verticesA) {
                    const projection = normal.x * vertex.x + normal.y * vertex.y;
                    minA = Math.min(minA, projection);
                    maxA = Math.max(maxA, projection);
                }
                let minB = Infinity;
                let maxB = -Infinity;
                for (const vertex of verticesB) {
                    const projection = normal.x * vertex.x + normal.y * vertex.y;
                    minB = Math.min(minB, projection);
                    maxB = Math.max(maxB, projection);
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