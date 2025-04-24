import { EventTreeNode } from "@commonmodule/ts";
export default class GameNode extends EventTreeNode {
    _screen;
    set screen(screen) {
        if (this._screen === screen)
            return;
        if (this._screen === undefined && screen !== undefined) {
            this.emit("visible", ...[]);
        }
        this._screen = screen;
        for (const child of this.children) {
            child.screen = screen;
        }
    }
    get screen() {
        return this._screen;
    }
    append(...children) {
        for (const child of children) {
            if (child === undefined)
                continue;
            else
                child.appendTo(this);
        }
        return this;
    }
    appendTo(parent, index) {
        this.screen = parent.screen;
        return super.appendTo(parent, index);
    }
    update(deltaTime) {
        if (!this.removed) {
            for (const child of this.children) {
                child.update(deltaTime);
            }
        }
    }
}
//# sourceMappingURL=GameNode.js.map