import CircleCollider from "./CircleCollider.js";
import PolygonCollider from "./PolygonCollider.js";
import RectCollider from "./RectCollider.js";

type Collider = RectCollider | CircleCollider | PolygonCollider;

export default Collider;
