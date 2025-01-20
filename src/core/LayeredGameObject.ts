import GameNode from "./GameNode.js";
import TransformableNode from "./TransformableNode.js";

export default class LayeredGameObject extends TransformableNode {
  constructor(
    x: number,
    y: number,
    layer: string,
    ...gameNodes: (GameNode | undefined)[]
  ) {
    super(x, y);
    this.append(...gameNodes);
  }
}
