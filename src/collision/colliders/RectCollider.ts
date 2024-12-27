import ColliderType from "./ColliderType.js";

export default interface RectCollider {
  type: ColliderType.Rectangle;
  x: number;
  y: number;
  width: number;
  height: number;
}