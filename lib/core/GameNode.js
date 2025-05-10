import { EventNode } from "@commonmodule/ts";
export default class GameNode extends EventNode {
    _screen;
    _paused = false;
    set screen(screen) {
        if (this._screen === screen)
            return;
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
    pause() {
        this._paused = true;
        for (const child of this.children) {
            child.pause();
        }
    }
    resume() {
        this._paused = false;
        for (const child of this.children) {
            child.resume();
        }
    }
    isPaused() {
        return this._paused;
    }
    update(deltaTime) {
        if (!this.isRemoved() && !this.isPaused()) {
            for (const child of this.children) {
                child.update(deltaTime);
            }
        }
    }
}
//# sourceMappingURL=GameNode.js.map