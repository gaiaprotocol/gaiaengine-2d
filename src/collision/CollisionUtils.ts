import Transform from "../core/Transform.js";
import Collider from "./collider/Collider.js";
import ColliderType from "./collider/ColliderType.js";
import EllipseCollider from "./collider/EllipseCollider.js";
import PolygonCollider from "./collider/PolygonCollider.js";
import RectCollider from "./collider/RectCollider.js";

class CollisionUtils {
  /**
   * Checks whether two colliders are colliding
   */
  public checkCollision(
    colliderA: Collider,
    transformA: Transform,
    colliderB: Collider,
    transformB: Transform,
  ): boolean {
    //TODO: Check if the collider is infinite or NaN
    if (
      transformA.x === -Infinity || transformA.y === -Infinity ||
      transformB.x === -Infinity || transformB.y === -Infinity ||
      transformA.x === Infinity || transformA.y === Infinity ||
      transformB.x === Infinity || transformB.y === Infinity
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

  /**
   * Checks if a point is inside a rectangle
   */
  public isPointInsideRect(
    pointX: number,
    pointY: number,
    rect: RectCollider,
    transform: Transform,
  ): boolean {
    // Calculate the center coordinates of the rectangle
    const rectCenterX = transform.x + rect.x * transform.scaleX;
    const rectCenterY = transform.y + rect.y * transform.scaleY;

    // Transform the point into the rectangle's local coordinate system
    const dx = pointX - rectCenterX;
    const dy = pointY - rectCenterY;

    // Apply inverse rotation to transform the point to local space
    const cos = Math.cos(-transform.rotation);
    const sin = Math.sin(-transform.rotation);
    const localX = dx * cos - dy * sin;
    const localY = dx * sin + dy * cos;

    // Calculate half width and half height of the rectangle
    const halfWidth = (rect.width * transform.scaleX) / 2;
    const halfHeight = (rect.height * transform.scaleY) / 2;

    // Check if the point is inside the rectangle bounds
    return (
      localX >= -halfWidth &&
      localX <= halfWidth &&
      localY >= -halfHeight &&
      localY <= halfHeight
    );
  }

  /**
   * Checks if a point is inside an ellipse
   */
  public isPointInsideEllipse(
    pointX: number,
    pointY: number,
    ellipse: EllipseCollider,
    transform: Transform,
  ): boolean {
    // Calculate the center coordinates of the ellipse
    const ellipseCenterX = transform.x + ellipse.x * transform.scaleX;
    const ellipseCenterY = transform.y + ellipse.y * transform.scaleY;

    // Transform the point into the ellipse's local coordinate system
    const dx = pointX - ellipseCenterX;
    const dy = pointY - ellipseCenterY;

    // Apply inverse rotation to transform the point to local space
    const cos = Math.cos(-transform.rotation);
    const sin = Math.sin(-transform.rotation);
    const localX = dx * cos - dy * sin;
    const localY = dx * sin + dy * cos;

    // Calculate the semi-major and semi-minor axes of the ellipse
    const a = (ellipse.width * transform.scaleX) / 2;
    const b = (ellipse.height * transform.scaleY) / 2;

    // Use the ellipse equation to check if the point is inside
    const value = (localX * localX) / (a * a) + (localY * localY) / (b * b);

    return value <= 1;
  }

  /**
   * Checks if a point is inside a polygon
   */
  public isPointInsidePolygon(
    pointX: number,
    pointY: number,
    polygon: PolygonCollider,
    transform: Transform,
  ): boolean {
    // Transform the polygon's points
    const transformedPoints = this.transformPolygonPoints(polygon, transform);

    // Use the ray casting algorithm to check if the point is inside the polygon
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
        pointX < ((xj - xi) * (pointY - yi)) / (yj - yi) + xi;

      if (intersect) inside = !inside;
    }

    return inside;
  }

  /**
   * Checks if two line segments intersect
   */
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
    // Calculate the denominator for intersection point
    const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
    if (denom === 0) {
      // Lines are parallel
      return false;
    }

    const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
    const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;

    return ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1;
  }

  /**
   * Checks if two rectangles are colliding
   */
  public rectRectCollision(
    rectA: RectCollider,
    transformA: Transform,
    rectB: RectCollider,
    transformB: Transform,
  ): boolean {
    // Calculate the vertices of each rectangle
    const verticesA = this.getRectVertices(rectA, transformA);
    const verticesB = this.getRectVertices(rectB, transformB);

    // Use the Separating Axis Theorem to check for collision
    return this.doPolygonsIntersect(verticesA, verticesB);
  }

  /**
   * Calculates the vertices of a rectangle
   */
  private getRectVertices(
    rect: RectCollider,
    transform: Transform,
  ): { x: number; y: number }[] {
    const halfWidth = (rect.width * transform.scaleX) / 2;
    const halfHeight = (rect.height * transform.scaleY) / 2;

    // Vertices in local coordinate system
    const localVertices = [
      { x: -halfWidth, y: -halfHeight },
      { x: halfWidth, y: -halfHeight },
      { x: halfWidth, y: halfHeight },
      { x: -halfWidth, y: halfHeight },
    ];

    // Apply rotation and translation
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

  /**
   * Checks if two ellipses are colliding
   */
  public ellipseEllipseCollision(
    ellipseA: EllipseCollider,
    transformA: Transform,
    ellipseB: EllipseCollider,
    transformB: Transform,
  ): boolean {
    // Approximate the ellipses as polygons for collision detection
    const polygonA = this.approximateEllipse(
      ellipseA,
      transformA,
      16, // Number of sides for approximation
    );

    const polygonB = this.approximateEllipse(
      ellipseB,
      transformB,
      16,
    );

    return this.doPolygonsIntersect(polygonA, polygonB);
  }

  /**
   * Approximates an ellipse as a polygon
   */
  private approximateEllipse(
    ellipse: EllipseCollider,
    transform: Transform,
    numSides: number,
  ): { x: number; y: number }[] {
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

      // Apply rotation and translation
      const rotatedX = x * cosRotation - y * sinRotation + centerX;
      const rotatedY = x * sinRotation + y * cosRotation + centerY;

      vertices.push({ x: rotatedX, y: rotatedY });
    }

    return vertices;
  }

  /**
   * Checks if a rectangle and an ellipse are colliding
   */
  public rectEllipseCollision(
    rect: RectCollider,
    rectTransform: Transform,
    ellipse: EllipseCollider,
    ellipseTransform: Transform,
  ): boolean {
    // Approximate the ellipse as a polygon
    const ellipseVertices = this.approximateEllipse(
      ellipse,
      ellipseTransform,
      16,
    );

    // Get the rectangle's vertices
    const rectVertices = this.getRectVertices(rect, rectTransform);

    return this.doPolygonsIntersect(rectVertices, ellipseVertices);
  }

  /**
   * Checks if an ellipse and a polygon are colliding
   */
  public ellipsePolygonCollision(
    ellipse: EllipseCollider,
    ellipseTransform: Transform,
    polygon: PolygonCollider,
    polygonTransform: Transform,
  ): boolean {
    // Approximate the ellipse as a polygon
    const ellipseVertices = this.approximateEllipse(
      ellipse,
      ellipseTransform,
      16,
    );

    // Transform the polygon's points
    const polygonVertices = this.transformPolygonPoints(
      polygon,
      polygonTransform,
    );

    return this.doPolygonsIntersect(ellipseVertices, polygonVertices);
  }

  /**
   * Checks if a rectangle and a polygon are colliding
   */
  public rectPolygonCollision(
    rect: RectCollider,
    rectTransform: Transform,
    polygon: PolygonCollider,
    polygonTransform: Transform,
  ): boolean {
    // Get the rectangle's vertices
    const rectVertices = this.getRectVertices(rect, rectTransform);

    // Transform the polygon's points
    const polygonVertices = this.transformPolygonPoints(
      polygon,
      polygonTransform,
    );

    return this.doPolygonsIntersect(rectVertices, polygonVertices);
  }

  /**
   * Checks if two polygons are colliding
   */
  public polygonPolygonCollision(
    polygonA: PolygonCollider,
    transformA: Transform,
    polygonB: PolygonCollider,
    transformB: Transform,
  ): boolean {
    const verticesA = this.transformPolygonPoints(polygonA, transformA);
    const verticesB = this.transformPolygonPoints(polygonB, transformB);

    return this.doPolygonsIntersect(verticesA, verticesB);
  }

  /**
   * Transforms the points of a polygon
   */
  private transformPolygonPoints(
    polygon: PolygonCollider,
    transform: Transform,
  ): { x: number; y: number }[] {
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

  /**
   * Uses the Separating Axis Theorem (SAT) to check if two polygons intersect
   */
  private doPolygonsIntersect(
    verticesA: { x: number; y: number }[],
    verticesB: { x: number; y: number }[],
  ): boolean {
    const polygons = [verticesA, verticesB];

    for (let i = 0; i < polygons.length; i++) {
      const polygon = polygons[i];

      for (let j = 0; j < polygon.length; j++) {
        const k = (j + 1) % polygon.length;

        // Calculate the edge vector
        const edge = {
          x: polygon[k].x - polygon[j].x,
          y: polygon[k].y - polygon[j].y,
        };

        // Calculate the normal vector (perpendicular to the edge)
        const normal = { x: -edge.y, y: edge.x };

        // Project both polygons onto the normal
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

        // Check for overlap
        if (maxA < minB || maxB < minA) {
          // Separating axis found, no collision
          return false;
        }
      }
    }

    // No separating axis found, polygons intersect
    return true;
  }
}

export default new CollisionUtils();
