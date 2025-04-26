import GameObject from "../core/GameObject.js";
export default class DebugColliderDrawNode extends GameObject {
    private strokeColor;
    parent: GameObject | undefined;
    private parentScale;
    constructor(strokeColor: string);
    appendTo(parent: GameObject, index?: number): this;
    protected update(deltaTime: number): void;
}
//# sourceMappingURL=DebugColliderDrawNode.d.ts.map