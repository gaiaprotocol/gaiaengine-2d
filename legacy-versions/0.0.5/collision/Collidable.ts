import Node from "../base/Node.js";
import Collider from "./Collider.js";

export default class Collidable extends Node {
  public colliders: Collider[] = [];

  protected addCollider(...collider: Collider[]) {
    this.colliders.push(...collider);
  }
}
