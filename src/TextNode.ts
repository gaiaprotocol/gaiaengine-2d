import { Text } from "pixi.js";
import DisplayNode from "./core/DisplayNode.js";

export default class TextNode extends DisplayNode<Text> {
  constructor(x: number, y: number, text: string) {
    super(new Text({ x, y, text }));
  }
}
