export default class StateSet {
    states;
    currentState;
    currentStateNode;
    constructor(target, states, currentState) {
        this.states = states;
        this.currentState = currentState;
        for (const state in states) {
            target.append(states[state]);
            if (state === currentState)
                this.currentStateNode = states[state];
            else
                states[state].hide();
        }
    }
    set state(state) {
        this.currentState = state;
        this.currentStateNode?.hide();
        this.currentStateNode = this.states[state];
        this.currentStateNode?.show();
    }
    get state() {
        return this.currentState;
    }
}
//# sourceMappingURL=StateSet.js.map