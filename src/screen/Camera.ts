import Node from "../base/Node.js";

export default class Camera {
  public x = 0;
  public y = 0;
  public target: Node;

  constructor(target: Node) {
    this.target = target;
  }
}
