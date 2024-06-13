import Node from "../base/Node.js";
export default class StateSet {
    private states;
    private currentState;
    private currentStateNode;
    constructor(target: Node, states: {
        [state: string]: Node;
    }, currentState: string);
    set state(state: string);
    get state(): string;
}
//# sourceMappingURL=StateSet.d.ts.map