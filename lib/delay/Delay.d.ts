import GameNode from "../core/GameNode.js";
export default class Delay extends GameNode {
    private readonly delayDuration;
    private readonly callback;
    private accumulatedTime;
    constructor(delayDuration: number, callback: () => void);
    protected update(deltaTime: number): void;
}
//# sourceMappingURL=Delay.d.ts.map