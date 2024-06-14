import { TreeNode } from "@common-module/app";
export default class Entity extends TreeNode {
    _tick(deltaTime) {
        this.update(deltaTime);
        for (const child of this.children) {
            child._tick(deltaTime);
        }
    }
}
//# sourceMappingURL=Entity.js.map