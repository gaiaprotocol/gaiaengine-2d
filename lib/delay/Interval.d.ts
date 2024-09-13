import GameNode from "../core/GameNode.js";
export default class Interval extends GameNode {
    private readonly intervalDuration;
    private readonly callback;
    private accumulatedTime;
    constructor(intervalDuration: number, callback: () => void);
    protected update(deltaTime: number): void;
}
//# sourceMappingURL=Interval.d.ts.map