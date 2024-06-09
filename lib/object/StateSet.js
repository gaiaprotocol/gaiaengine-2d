export default class StateSet {
    states;
    currentStateNode;
    constructor(target, states, initialState) {
        this.states = states;
        for (const state in states) {
            target.append(states[state]);
            if (state === initialState)
                this.currentStateNode = states[state];
            else
                states[state].hide();
        }
    }
    setState(state) {
        this.currentStateNode?.hide();
        this.currentStateNode = this.states[state];
        this.currentStateNode?.show();
    }
}
//# sourceMappingURL=StateSet.js.map