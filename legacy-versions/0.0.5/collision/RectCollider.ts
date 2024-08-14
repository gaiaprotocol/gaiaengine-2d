import ColliderType from "./ColliderType.js";

export default interface RectCollider {
  type: ColliderType.Rect;
  x: number;
  y: number;
  width: number;
  height: number;
}
