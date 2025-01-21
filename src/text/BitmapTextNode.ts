import { BitmapText } from "pixi.js";
import DisplayNode from "../core/DisplayNode.js";

export default class BitmapTextNode extends DisplayNode<BitmapText> {
  constructor(x: number, y: number, text: string) {
    super(new BitmapText({ x, y, text }));
  }
}
