import BaseCollider from "./BaseCollider.js";
import ColliderType from "./ColliderType.js";

export default interface CircleCollider extends BaseCollider {
  type: ColliderType.Circle;
  radius: number;
}
