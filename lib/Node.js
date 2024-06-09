import { ArrayUtil, TreeNode } from "@common-module/app";
import { Container } from "pixi.js";
export default class Node extends TreeNode {
    _screen;
    container;
    windowEventMap = {};
    constructor(x, y) {
        super();
        this.container = new Container({ x, y });
    }
    setPosition(x, y) {
        this.container.position.set(x, y);
    }
    set scaleX(scaleX) {
        this.container.scale.x = scaleX;
    }
    get scaleX() {
        return this.container.scale.x;
    }
    hide() {
        this.container.visible = false;
    }
    show() {
        this.container.visible = true;
    }
    step(deltaTime) {
        for (const child of this.children) {
            child.step(deltaTime);
        }
    }
    set screen(screen) {
        this._screen = screen;
        for (const child of this.children) {
            child.screen = screen;
        }
    }
    get screen() {
        return this._screen;
    }
    appendTo(node, index) {
        if (index !== undefined && index < node.children.length) {
            node.container.addChildAt(this.container, index);
        }
        else {
            node.container.addChild(this.container);
        }
        this.screen = node.screen;
        return super.appendTo(node, index);
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
        this.container.destroy();
        for (const [eventName, domEvents] of Object.entries(this.windowEventMap)) {
            for (const domEvent of domEvents) {
                window.removeEventListener(eventName, domEvent.domEventHandler);
            }
        }
        this.windowEventMap = undefined;
        super.delete();
        this.container = undefined;
    }
}
//# sourceMappingURL=Node.js.map