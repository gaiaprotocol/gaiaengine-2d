import { TreeNode } from "@common-module/app";
export default class Entity extends TreeNode {
    _tick(deltaTime) {
        this.update(deltaTime);
        if (!this.deleted) {
            for (const child of this.children) {
                child._tick(deltaTime);
            }
        }
    }
}
//# sourceMappingURL=Entity.js.map