import Node from "../base/Node.js";

export interface TilemapData {
  tileSize: number;
}

export default class Tilemap extends Node {
  constructor(x: number, y: number) {
    super(x, y);
  }
}
