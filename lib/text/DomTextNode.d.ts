import DomWrapperNode from "../dom/DomWrapperNode.js";
export default class DomTextNode<ST extends Partial<CSSStyleDeclaration>> extends DomWrapperNode {
    constructor(x: number, y: number, text: string, style: ST);
    set text(text: string);
    get text(): string;
}
//# sourceMappingURL=DomTextNode.d.ts.map