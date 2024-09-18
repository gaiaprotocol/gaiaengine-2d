import DomWrapperNode from "./DomWrapperNode.js";
export default class TextNode<ST extends Partial<CSSStyleDeclaration>> extends DomWrapperNode {
    constructor(x: number, y: number, text: string, style: ST);
    set text(text: string);
    get text(): string;
}
//# sourceMappingURL=TextNode.d.ts.map