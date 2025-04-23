import GameNode from "../core/GameNode.js";
export default class Interval extends GameNode {
    private readonly intervalDuration;
    private readonly callback;
    private readonly startImmediately;
    private accumulatedTime;
    constructor(intervalDuration: number, callback: () => void, startImmediately?: boolean);
    protected update(deltaTime: number): void;
}
//# sourceMappingURL=Interval.d.ts.map