import ColliderType from "./ColliderType.js";

export default interface EllipseCollider {
  type: ColliderType.Ellipse;
  x: number;
  y: number;
  width: number;
  height: number;
}