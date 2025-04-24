import GameNode from "../core/GameNode.js";
import GameObject from "../core/GameObject.js";
export default class DebugColliderDrawNode extends GameObject {
    private strokeColor;
    private parentScale;
    constructor(strokeColor: string);
    appendTo(parent: GameNode, index?: number): this;
    protected update(deltaTime: number): void;
}
//# sourceMappingURL=DebugColliderDrawNode.d.ts.map