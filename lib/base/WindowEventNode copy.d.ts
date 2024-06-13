import Node from "./Node.js";
type WindowEventHandler<ET extends Event, NT extends Node> = (event: ET, node: NT) => any;
export default class WindowEventNode extends Node {
    private windowEventMap;
    constructor(x: number, y: number);
    onWindow<ET extends Event>(eventName: string, eventHandler: WindowEventHandler<ET, this>): void;
    offWindow<ET extends Event>(eventName: string, eventHandler: WindowEventHandler<ET, this>): void;
    delete(): void;
}
export {};
//# sourceMappingURL=WindowEventNode%20copy.d.ts.map