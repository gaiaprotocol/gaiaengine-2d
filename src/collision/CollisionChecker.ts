import GameNode from "../core/GameNode.js";
import Collidable from "./Collidable.js";

export default class CollisionChecker<CT extends Collidable> extends GameNode {
  constructor(
    collidables: Collidable[],
    obstacles: CT[],
    onCollision: (collidable: Collidable, obstacle: CT) => void,
  ) {
    super();
  }
}
