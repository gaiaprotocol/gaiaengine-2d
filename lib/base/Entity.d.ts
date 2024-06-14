import { TreeNode } from "@common-module/app";
export default abstract class Entity extends TreeNode {
    parent: Entity | undefined;
    children: Entity[];
    protected abstract update(deltaTime: number): void;
    private _tick;
}
//# sourceMappingURL=Entity.d.ts.map