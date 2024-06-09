import Node from "../Node.js";
export default class StateSet {
    private states;
    private currentStateNode;
    constructor(target: Node, states: {
        [state: string]: Node;
    }, initialState: string);
    setState(state: string): void;
}
//# sourceMappingURL=StateSet.d.ts.map