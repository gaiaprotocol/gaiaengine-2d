import { TreeNode } from "@common-module/app";
export default class Entity extends TreeNode {
    parent: Entity | undefined;
    children: Entity[];
    constructor();
    step(deltaTime: number): void;
}
//# sourceMappingURL=Entity.d.ts.map