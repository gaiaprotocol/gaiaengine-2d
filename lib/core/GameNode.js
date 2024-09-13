import { TreeNode } from "@common-module/ts";
export default class GameNode extends TreeNode {
    _screen;
    set screen(screen) {
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