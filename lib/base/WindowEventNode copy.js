import { ArrayUtil } from "@common-module/app";
import Node from "./Node.js";
export default class WindowEventNode extends Node {
    windowEventMap = {};
    constructor(x, y) {
        super(x, y);
    }
    onWindow(eventName, eventHandler) {
        if (this.windowEventMap[eventName] === undefined) {
            this.windowEventMap[eventName] = [];
        }
        const domEventHandler = (event) => eventHandler(event, this);
        this.windowEventMap[eventName].push({ eventHandler, domEventHandler });
        window.addEventListener(eventName, domEventHandler);
    }
    offWindow(eventName, eventHandler) {
        const windowEvents = this.windowEventMap[eventName];
        if (windowEvents !== undefined) {
            const windowEvent = windowEvents.find((we) => we.eventHandler === eventHandler);
            if (windowEvent !== undefined) {
                window.removeEventListener(eventName, windowEvent.domEventHandler);
                ArrayUtil.pull(windowEvents, windowEvent);
                if (windowEvents.length === 0) {
                    delete this.windowEventMap[eventName];
                }
            }
        }
    }
    delete() {
        for (const [eventName, domEvents] of Object.entries(this.windowEventMap)) {
            for (const domEvent of domEvents) {
                window.removeEventListener(eventName, domEvent.domEventHandler);
            }
        }
        this.windowEventMap = undefined;
        super.delete();
    }
}
//# sourceMappingURL=WindowEventNode%20copy.js.map