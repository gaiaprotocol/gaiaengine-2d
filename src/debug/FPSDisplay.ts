import TextNode from "../dom/TextNode.js";

export default class FPSDisplay extends TextNode {
  constructor() {
    super(0, 0, "FPS: 0");
  }
}
