import Node from "../base/Node.js";

export interface SmoothVectorShapeData {
}

export default class SmoothVectorShape extends Node {
  constructor(x: number, y: number, data: SmoothVectorShapeData) {
    super(x, y);
  }
}
