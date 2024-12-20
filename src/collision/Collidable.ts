import Transform from "../core/Transform.js";
import Collider from "./collider/Collider.js";

export default interface Collidable {
  colliders: Collider[];
  globalTransform: Transform;
}
