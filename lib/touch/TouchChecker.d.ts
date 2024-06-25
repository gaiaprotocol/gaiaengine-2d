import { TreeNode } from "@common-module/app";
import Node from "../base/Node.js";
import Collider from "../collision/Collider.js";
import Screen from "../screen/Screen.js";
import TouchEventType from "./TouchEventType.js";
export default class TouchChecker extends TreeNode {
    private collider;
    private eventHandler;
    parent: Node | undefined;
    private _screen;
    private domEventNames;
    constructor(eventType: TouchEventType, collider: Collider, eventHandler: (x: number, y: number) => void);
    private domEventHandler;
    set screen(screen: Screen | undefined);
    get screen(): Screen | undefined;
    appendTo(node: Node, index?: number): this;
    delete(): void;
    private _tick;
}
//# sourceMappingURL=TouchChecker.d.ts.map