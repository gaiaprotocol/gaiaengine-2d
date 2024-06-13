import { TreeNode } from "@common-module/app";

export default class Entity extends TreeNode {
  declare parent: Entity | undefined;
  declare children: Entity[];

  constructor() {
    super();
  }

  public step(deltaTime: number) {
    for (const child of this.children) {
      child.step(deltaTime);
    }
  }
}
