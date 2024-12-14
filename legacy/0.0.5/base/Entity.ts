import { TreeNode } from "@common-module/app";

export default abstract class Entity extends TreeNode {
  declare parent: Entity | undefined;
  declare children: Entity[];

  protected abstract update(deltaTime: number): void;

  private _tick(deltaTime: number) {
    this.update(deltaTime);
    if (!this.deleted) {
      for (const child of this.children) {
        child._tick(deltaTime);
      }
    }
  }
}
