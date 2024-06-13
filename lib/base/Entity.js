import { TreeNode } from "@common-module/app";
export default class Entity extends TreeNode {
    constructor() {
        super();
    }
    step(deltaTime) {
        for (const child of this.children) {
            child.step(deltaTime);
        }
    }
}
//# sourceMappingURL=Entity.js.map