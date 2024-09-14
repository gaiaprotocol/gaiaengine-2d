import Transform from "../core/Transform.js";
import CircleCollider from "./collider/CircleCollider.js";
import Collider from "./collider/Collider.js";
import ColliderType from "./collider/ColliderType.js";
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
    if (
      colliderA.type === ColliderType.Rectangle &&
      colliderB.type === ColliderType.Rectangle
    ) {
      return this.isRectCollidingWithRect(
        colliderA as RectCollider,
        transformA,
        colliderB as RectCollider,
        transformB,
      );
    } else if (
      colliderA.type === ColliderType.Circle &&
      colliderB.type === ColliderType.Circle
    ) {
      return this.isCircleCollidingWithCircle(
        colliderA as CircleCollider,
        transformA,
        colliderB as CircleCollider,
        transformB,
      );
    } else if (
      colliderA.type === ColliderType.Rectangle &&
      colliderB.type === ColliderType.Circle
    ) {
      return this.isRectCollidingWithCircle(
        colliderA as RectCollider,
        transformA,
        colliderB as CircleCollider,
        transformB,
      );
    } else if (
      colliderA.type === ColliderType.Circle &&
      colliderB.type === ColliderType.Rectangle
    ) {
      return this.isRectCollidingWithCircle(
        colliderB as RectCollider,
        transformB,
        colliderA as CircleCollider,
        transformA,
      );
    } else if (
      colliderA.type === ColliderType.Polygon &&
      colliderB.type === ColliderType.Circle
    ) {
      return this.isCircleCollidingWithPolygon(
        colliderB as CircleCollider,
        transformB,
        colliderA as PolygonCollider,
        transformA,
      );
    } else if (
      colliderA.type === ColliderType.Circle &&
      colliderB.type === ColliderType.Polygon
    ) {
      return this.isCircleCollidingWithPolygon(
        colliderA as CircleCollider,
        transformA,
        colliderB as PolygonCollider,
        transformB,
      );
    } else if (
      colliderA.type === ColliderType.Rectangle &&
      colliderB.type === ColliderType.Polygon
    ) {
      return this.isRectCollidingWithPolygon(
        colliderA as RectCollider,
        transformA,
        colliderB as PolygonCollider,
        transformB,
      );
    } else if (
      colliderA.type === ColliderType.Polygon &&
      colliderB.type === ColliderType.Rectangle
    ) {
      return this.isRectCollidingWithPolygon(
        colliderB as RectCollider,
        transformB,
        colliderA as PolygonCollider,
        transformA,
      );
    } else if (
      colliderA.type === ColliderType.Polygon &&
      colliderB.type === ColliderType.Polygon
    ) {
      return this.isPolygonCollidingWithPolygon(
        colliderA as PolygonCollider,
        transformA,
        colliderB as PolygonCollider,
        transformB,
      );
    }
    return false;
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
    const cos = Math.cos(transform.rotation);
    const sin = Math.sin(transform.rotation);

    // Rectangle center coordinates
    const rectCenterX = transform.x + rect.x * transform.scaleX;
    const rectCenterY = transform.y + rect.y * transform.scaleY;

    // Transform point to rectangle's local coordinate system
    const dx = pointX - rectCenterX;
    const dy = pointY - rectCenterY;
    const localX = cos * dx + sin * dy;
    const localY = -sin * dx + cos * dy;

    // Half width and half height of the rectangle
    const halfWidth = (rect.width * transform.scaleX) / 2;
    const halfHeight = (rect.height * transform.scaleY) / 2;

    // Check if point is inside rectangle bounds
    return (
      localX >= -halfWidth &&
      localX <= halfWidth &&
      localY >= -halfHeight &&
      localY <= halfHeight
    );
  }

  /**
   * Checks if a point is inside a circle
   */
  public isPointInsideCircle(
    pointX: number,
    pointY: number,
    circle: CircleCollider,
    transform: Transform,
  ): boolean {
    // Circle center coordinates
    const circleCenterX = transform.x + circle.x * transform.scaleX;
    const circleCenterY = transform.y + circle.y * transform.scaleY;

    // Distance squared between point and circle center
    const deltaX = pointX - circleCenterX;
    const deltaY = pointY - circleCenterY;
    const distanceSquared = deltaX * deltaX + deltaY * deltaY;

    // Radius of the circle
    const radius = circle.radius * ((transform.scaleX + transform.scaleY) / 2);

    // Check if point is inside the circle
    return distanceSquared <= radius * radius;
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
    // Transform polygon points
    const transformedPoints = this.transformPolygonPoints(polygon, transform);

    // Use ray casting algorithm to check if point is inside polygon
    let inside = false;
    const length = transformedPoints.length;

    for (let i = 0, j = length - 1; i < length; j = i++) {
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
   * Checks if two lines are intersecting
   */
  public isLineIntersectingLine(
    ax1: number,
    ay1: number,
    ax2: number,
    ay2: number,
    bx1: number,
    by1: number,
    bx2: number,
    by2: number,
  ): boolean {
    const denominator = (ax2 - ax1) * (by2 - by1) - (ay2 - ay1) * (bx2 - bx1);

    if (denominator === 0) {
      return false; // Lines are parallel
    }

    const ua = ((bx2 - bx1) * (ay1 - by1) - (by2 - by1) * (ax1 - bx1)) /
      denominator;
    const ub = ((ax2 - ax1) * (ay1 - by1) - (ay2 - ay1) * (ax1 - bx1)) /
      denominator;

    return ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1;
  }

  /**
   * Checks if two rectangles are colliding
   */
  public isRectCollidingWithRect(
    rectA: RectCollider,
    transformA: Transform,
    rectB: RectCollider,
    transformB: Transform,
  ): boolean {
    // Calculate vertices of rectangle A
    const pointsA = this.getRectVertices(rectA, transformA);

    // Calculate vertices of rectangle B
    const pointsB = this.getRectVertices(rectB, transformB);

    // Use SAT algorithm to check for collision
    return this.doPolygonsIntersect(pointsA, pointsB);
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

    const cos = Math.cos(transform.rotation);
    const sin = Math.sin(transform.rotation);

    // Center coordinates of the rectangle
    const centerX = transform.x + rect.x * transform.scaleX;
    const centerY = transform.y + rect.y * transform.scaleY;

    // Calculate the four corners of the rectangle
    const vertices = [
      { x: -halfWidth, y: -halfHeight },
      { x: halfWidth, y: -halfHeight },
      { x: halfWidth, y: halfHeight },
      { x: -halfWidth, y: halfHeight },
    ];

    // Apply rotation and translation
    return vertices.map((vertex) => {
      const x = vertex.x;
      const y = vertex.y;
      return {
        x: cos * x - sin * y + centerX,
        y: sin * x + cos * y + centerY,
      };
    });
  }

  /**
   * Checks if two circles are colliding
   */
  public isCircleCollidingWithCircle(
    circleA: CircleCollider,
    transformA: Transform,
    circleB: CircleCollider,
    transformB: Transform,
  ): boolean {
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

  /**
   * Checks if a rectangle and a circle are colliding
   */
  public isRectCollidingWithCircle(
    rect: RectCollider,
    rectTransform: Transform,
    circle: CircleCollider,
    circleTransform: Transform,
  ): boolean {
    const cos = Math.cos(-rectTransform.rotation);
    const sin = Math.sin(-rectTransform.rotation);

    // Rectangle center coordinates
    const rectCenterX = rectTransform.x + rect.x * rectTransform.scaleX;
    const rectCenterY = rectTransform.y + rect.y * rectTransform.scaleY;

    // Circle center coordinates
    const circleCenterX = circleTransform.x + circle.x * circleTransform.scaleX;
    const circleCenterY = circleTransform.y + circle.y * circleTransform.scaleY;

    // Transform circle center to rectangle's local coordinate system
    const dx = circleCenterX - rectCenterX;
    const dy = circleCenterY - rectCenterY;
    const localX = cos * dx + sin * dy;
    const localY = -sin * dx + cos * dy;

    // Half width and half height of the rectangle
    const halfWidth = (rect.width * rectTransform.scaleX) / 2;
    const halfHeight = (rect.height * rectTransform.scaleY) / 2;

    // Find the closest point to the circle within the rectangle
    const closestX = Math.max(-halfWidth, Math.min(localX, halfWidth));
    const closestY = Math.max(-halfHeight, Math.min(localY, halfHeight));

    // Calculate the distance between the circle's center and this closest point
    const distanceX = localX - closestX;
    const distanceY = localY - closestY;
    const distanceSquared = distanceX * distanceX + distanceY * distanceY;

    // Radius of the circle
    const radius = circle.radius *
      ((circleTransform.scaleX + circleTransform.scaleY) / 2);

    return distanceSquared <= radius * radius;
  }

  /**
   * Checks if a circle and a polygon are colliding
   */
  public isCircleCollidingWithPolygon(
    circle: CircleCollider,
    circleTransform: Transform,
    polygon: PolygonCollider,
    polygonTransform: Transform,
  ): boolean {
    // Calculate circle center coordinates and radius
    const circleCenterX = circleTransform.x + circle.x * circleTransform.scaleX;
    const circleCenterY = circleTransform.y + circle.y * circleTransform.scaleY;
    const radius = circle.radius *
      ((circleTransform.scaleX + circleTransform.scaleY) / 2);

    // Transform polygon points
    const transformedPoints = this.transformPolygonPoints(
      polygon,
      polygonTransform,
    );

    // 1. Check if circle's center is inside the polygon
    if (
      this.isPointInsidePolygon(
        circleCenterX,
        circleCenterY,
        polygon,
        polygonTransform,
      )
    ) {
      return true;
    }

    // 2. Check for collision between circle and polygon edges
    const length = transformedPoints.length;
    for (let i = 0, j = length - 1; i < length; j = i++) {
      const x1 = transformedPoints[j].x;
      const y1 = transformedPoints[j].y;
      const x2 = transformedPoints[i].x;
      const y2 = transformedPoints[i].y;

      if (
        this.isLineIntersectingCircle(
          x1,
          y1,
          x2,
          y2,
          circleCenterX,
          circleCenterY,
          radius,
        )
      ) {
        return true;
      }
    }

    return false;
  }

  /**
   * Checks if a line segment and a circle are intersecting
   */
  private isLineIntersectingCircle(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    circleX: number,
    circleY: number,
    radius: number,
  ): boolean {
    const dx = x2 - x1;
    const dy = y2 - y1;

    const fx = x1 - circleX;
    const fy = y1 - circleY;

    const a = dx * dx + dy * dy;
    const b = 2 * (fx * dx + fy * dy);
    const c = fx * fx + fy * fy - radius * radius;

    let discriminant = b * b - 4 * a * c;

    if (discriminant < 0) {
      // No intersection
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

  /**
   * Checks if a rectangle and a polygon are colliding
   */
  public isRectCollidingWithPolygon(
    rect: RectCollider,
    rectTransform: Transform,
    polygon: PolygonCollider,
    polygonTransform: Transform,
  ): boolean {
    // Get vertices of the rectangle
    const rectVertices = this.getRectVertices(rect, rectTransform);

    // Transform polygon vertices
    const polygonVertices = this.transformPolygonPoints(
      polygon,
      polygonTransform,
    );

    // 1. Check if any vertex of the rectangle is inside the polygon
    for (const vertex of rectVertices) {
      if (
        this.isPointInsidePolygon(vertex.x, vertex.y, polygon, polygonTransform)
      ) {
        return true;
      }
    }

    // 2. Check if any vertex of the polygon is inside the rectangle
    for (const vertex of polygonVertices) {
      if (this.isPointInsideRect(vertex.x, vertex.y, rect, rectTransform)) {
        return true;
      }
    }

    // 3. Check if any edges intersect
    if (this.doPolygonsIntersect(rectVertices, polygonVertices)) {
      return true;
    }

    return false;
  }

  /**
   * Checks if two polygons are colliding
   */
  public isPolygonCollidingWithPolygon(
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

    // Center coordinates of the polygon
    const centerX = transform.x + polygon.x * transform.scaleX;
    const centerY = transform.y + polygon.y * transform.scaleY;

    // Apply transformation to each point
    return polygon.points.map((point) => {
      const x = point.x * transform.scaleX;
      const y = point.y * transform.scaleY;

      return {
        x: cos * x - sin * y + centerX,
        y: sin * x + cos * y + centerY,
      };
    });
  }

  /**
   * Checks if two polygons intersect using the Separating Axis Theorem (SAT)
   */
  private doPolygonsIntersect(
    verticesA: { x: number; y: number }[],
    verticesB: { x: number; y: number }[],
  ): boolean {
    const polygons = [verticesA, verticesB];
    for (let i = 0; i < polygons.length; i++) {
      const polygon = polygons[i];

      for (let i1 = 0; i1 < polygon.length; i1++) {
        const i2 = (i1 + 1) % polygon.length;
        const p1 = polygon[i1];
        const p2 = polygon[i2];

        // Calculate the normal (perpendicular) of the edge
        const normal = { x: p2.y - p1.y, y: p1.x - p2.x };

        // Project all vertices of both polygons onto the normal
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

        // If there is no overlap on this axis, then there is no collision
        if (maxA! < minB! || maxB! < minA!) {
          return false;
        }
      }
    }

    return true;
  }
}

export default new CollisionUtils();
