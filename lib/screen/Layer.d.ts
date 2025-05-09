import { EventHandlers } from "@commonmodule/ts";
import GameObject from "../core/GameObject.js";
export default class Layer<E extends EventHandlers = {}> extends GameObject<E> {
    constructor();
    getContainer(): import("pixi.js").Container<import("pixi.js").ContainerChild>;
}
//# sourceMappingURL=Layer.d.ts.map