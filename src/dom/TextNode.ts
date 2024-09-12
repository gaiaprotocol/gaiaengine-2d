import DomWrapperNode from "./DomWrapperNode.js";

export default class TextNode extends DomWrapperNode {
  constructor(x: number, y: number, text: string) {
    super(x, y, "", text);
  }
}
