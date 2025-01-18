import Transform from "../core/Transform.js";
import Collider from "./colliders/Collider.js";
import ColliderType from "./colliders/ColliderType.js";
import EllipseCollider from "./colliders/EllipseCollider.js";
import PolygonCollider from "./colliders/PolygonCollider.js";
import RectCollider from "./colliders/RectCollider.js";

class CollisionUtils {
  public checkCollision(
    colliderA: Collider,
    transformA: Transform,
    colliderB: Collider,
    transformB: Transform,
  ): boolean {
    if (
      !this.isValidTransform(transformA) ||
      !this.isValidTransform(transformB)
    ) {
      return false;
    }

    if (colliderA.type === ColliderType.Rectangle) {
      if (colliderB.type === ColliderType.Rectangle) {
        return this.rectRectCollision(
          colliderA as RectCollider,
          transformA,
          colliderB as RectCollider,
          transformB,
        );
      } else if (colliderB.type === ColliderType.Ellipse) {
        return this.rectEllipseCollision(
          colliderA as RectCollider,
          transformA,
          colliderB as EllipseCollider,
          transformB,
        );
      } else if (colliderB.type === ColliderType.Polygon) {
        return this.rectPolygonCollision(
          colliderA as RectCollider,
          transformA,
          colliderB as PolygonCollider,
          transformB,
        );
      } else {
        return false;
      }
    } else if (colliderA.type === ColliderType.Ellipse) {
      if (colliderB.type === ColliderType.Rectangle) {
        return this.rectEllipseCollision(
          colliderB as RectCollider,
          transformB,
          colliderA as EllipseCollider,
          transformA,
        );
      } else if (colliderB.type === ColliderType.Ellipse) {
        return this.ellipseEllipseCollision(
          colliderA as EllipseCollider,
          transformA,
          colliderB as EllipseCollider,
          transformB,
        );
      } else if (colliderB.type === ColliderType.Polygon) {
        return this.ellipsePolygonCollision(
          colliderA as EllipseCollider,
          transformA,
          colliderB as PolygonCollider,
          transformB,
        );
      } else {
        return false;
      }
    } else if (colliderA.type === ColliderType.Polygon) {
      if (colliderB.type === ColliderType.Rectangle) {
        return this.rectPolygonCollision(
          colliderB as RectCollider,
          transformB,
          colliderA as PolygonCollider,
          transformA,
        );
      } else if (colliderB.type === ColliderType.Ellipse) {
        return this.ellipsePolygonCollision(
          colliderB as EllipseCollider,
          transformB,
          colliderA as PolygonCollider,
          transformA,
        );
      } else if (colliderB.type === ColliderType.Polygon) {
        return this.polygonPolygonCollision(
          colliderA as PolygonCollider,
          transformA,
          colliderB as PolygonCollider,
          transformB,
        );
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  private isValidTransform(transform: Transform): boolean {
    return (
      isFinite(transform.x) &&
      isFinite(transform.y) &&
      isFinite(transform.scaleX) &&
      isFinite(transform.scaleY) &&
      isFinite(transform.rotation)
    );
  }

  public isPointInsideRect(
    pointX: number,
    pointY: number,
    rect: RectCollider,
    transform: Transform,
  ): boolean {
    if (
      !isFinite(pointX) ||
      !isFinite(pointY) ||
      !this.isValidTransform(transform)
    ) {
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

    return (
      localX >= -halfWidth &&
      localX <= halfWidth &&
      localY >= -halfHeight &&
      localY <= halfHeight
    );
  }

  public isPointInsideEllipse(
    pointX: number,
    pointY: number,
    ellipse: EllipseCollider,
    transform: Transform,
  ): boolean {
    if (
      !isFinite(pointX) ||
      !isFinite(pointY) ||
      !this.isValidTransform(transform)
    ) {
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

  public isPointInsidePolygon(
    pointX: number,
    pointY: number,
    polygon: PolygonCollider,
    transform: Transform,
  ): boolean {
    if (
      !isFinite(pointX) ||
      !isFinite(pointY) ||
      !this.isValidTransform(transform)
    ) {
      return false;
    }

    const transformedPoints = this.transformPolygonPoints(polygon, transform);

    if (transformedPoints.length === 0) {
      return false;
    }

    let inside = false;
    for (
      let i = 0, j = transformedPoints.length - 1;
      i < transformedPoints.length;
      j = i++
    ) {
      const xi = transformedPoints[i].x;
      const yi = transformedPoints[i].y;
      const xj = transformedPoints[j].x;
      const yj = transformedPoints[j].y;

      const intersect = yi > pointY !== yj > pointY &&
        pointX <
          ((xj - xi) * (pointY - yi)) / (yj - yi + Number.EPSILON) + xi;

      if (intersect) inside = !inside;
    }

    return inside;
  }

  public isLineIntersectingLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x4: number,
    y4: number,
  ): boolean {
    if (
      ![
        x1,
        y1,
        x2,
        y2,
        x3,
        y3,
        x4,
        y4,
      ].every((val) => isFinite(val))
    ) {
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

  public rectRectCollision(
    rectA: RectCollider,
    transformA: Transform,
    rectB: RectCollider,
    transformB: Transform,
  ): boolean {
    const verticesA = this.getRectVertices(rectA, transformA);
    const verticesB = this.getRectVertices(rectB, transformB);

    if (verticesA.length === 0 || verticesB.length === 0) {
      return false;
    }

    return this.doPolygonsIntersect(verticesA, verticesB);
  }

  private getRectVertices(
    rect: RectCollider,
    transform: Transform,
  ): { x: number; y: number }[] {
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

  public ellipseEllipseCollision(
    ellipseA: EllipseCollider,
    transformA: Transform,
    ellipseB: EllipseCollider,
    transformB: Transform,
  ): boolean {
    const polygonA = this.approximateEllipse(
      ellipseA,
      transformA,
      16,
    );

    const polygonB = this.approximateEllipse(
      ellipseB,
      transformB,
      16,
    );

    if (polygonA.length === 0 || polygonB.length === 0) {
      return false;
    }

    return this.doPolygonsIntersect(polygonA, polygonB);
  }

  private approximateEllipse(
    ellipse: EllipseCollider,
    transform: Transform,
    numSides: number,
  ): { x: number; y: number }[] {
    if (!this.isValidTransform(transform)) {
      return [];
    }

    const centerX = transform.x + ellipse.x * transform.scaleX;
    const centerY = transform.y + ellipse.y * transform.scaleY;
    const a = (ellipse.width * transform.scaleX) / 2;
    const b = (ellipse.height * transform.scaleY) / 2;
    const radianStep = (Math.PI * 2) / numSides;
    const rotation = transform.rotation;

    const cosRotation = Math.cos(rotation);
    const sinRotation = Math.sin(rotation);

    if (!isFinite(centerX) || !isFinite(centerY)) {
      return [];
    }

    const vertices = [];

    for (let i = 0; i < numSides; i++) {
      const radian = i * radianStep;
      const x = a * Math.cos(radian);
      const y = b * Math.sin(radian);

      const rotatedX = x * cosRotation - y * sinRotation + centerX;
      const rotatedY = x * sinRotation + y * cosRotation + centerY;

      if (!isFinite(rotatedX) || !isFinite(rotatedY)) {
        continue;
      }

      vertices.push({ x: rotatedX, y: rotatedY });
    }

    return vertices;
  }

  public rectEllipseCollision(
    rect: RectCollider,
    rectTransform: Transform,
    ellipse: EllipseCollider,
    ellipseTransform: Transform,
  ): boolean {
    const ellipseVertices = this.approximateEllipse(
      ellipse,
      ellipseTransform,
      16,
    );

    const rectVertices = this.getRectVertices(rect, rectTransform);

    if (ellipseVertices.length === 0 || rectVertices.length === 0) {
      return false;
    }

    return this.doPolygonsIntersect(rectVertices, ellipseVertices);
  }

  public ellipsePolygonCollision(
    ellipse: EllipseCollider,
    ellipseTransform: Transform,
    polygon: PolygonCollider,
    polygonTransform: Transform,
  ): boolean {
    const ellipseVertices = this.approximateEllipse(
      ellipse,
      ellipseTransform,
      16,
    );

    const polygonVertices = this.transformPolygonPoints(
      polygon,
      polygonTransform,
    );

    if (ellipseVertices.length === 0 || polygonVertices.length === 0) {
      return false;
    }

    return this.doPolygonsIntersect(ellipseVertices, polygonVertices);
  }

  public rectPolygonCollision(
    rect: RectCollider,
    rectTransform: Transform,
    polygon: PolygonCollider,
    polygonTransform: Transform,
  ): boolean {
    const rectVertices = this.getRectVertices(rect, rectTransform);

    const polygonVertices = this.transformPolygonPoints(
      polygon,
      polygonTransform,
    );

    if (rectVertices.length === 0 || polygonVertices.length === 0) {
      return false;
    }

    return this.doPolygonsIntersect(rectVertices, polygonVertices);
  }

  public polygonPolygonCollision(
    polygonA: PolygonCollider,
    transformA: Transform,
    polygonB: PolygonCollider,
    transformB: Transform,
  ): boolean {
    const verticesA = this.transformPolygonPoints(polygonA, transformA);
    const verticesB = this.transformPolygonPoints(polygonB, transformB);

    if (verticesA.length === 0 || verticesB.length === 0) {
      return false;
    }

    return this.doPolygonsIntersect(verticesA, verticesB);
  }

  private transformPolygonPoints(
    polygon: PolygonCollider,
    transform: Transform,
  ): { x: number; y: number }[] {
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

        const transformedX = x * cos - y * sin + centerX;
        const transformedY = x * sin + y * cos + centerY;

        if (!isFinite(transformedX) || !isFinite(transformedY)) {
          return null;
        }

        return { x: transformedX, y: transformedY };
      })
      .filter((vertex) => vertex !== null) as { x: number; y: number }[];
  }

  private doPolygonsIntersect(
    verticesA: { x: number; y: number }[],
    verticesB: { x: number; y: number }[],
  ): boolean {
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
