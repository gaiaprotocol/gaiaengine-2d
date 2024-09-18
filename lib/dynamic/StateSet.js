export default class StateSet {
    states;
    currentState;
    currentObject;
    constructor(target, states, currentState) {
        this.states = states;
        this.currentState = currentState;
        for (const state in states) {
            target.append(states[state]);
            if (state === currentState)
                this.currentObject = states[state];
            else
                states[state].hide();
        }
    }
    set state(state) {
        if (!this.states[state]) {
            throw new Error(`State "${String(state)}" does not exist.`);
        }
        this.currentObject?.hide();
        this.currentObject = this.states[state];
        this.currentObject.show();
        this.currentState = state;
    }
    get state() {
        return this.currentState;
    }
}
//# sourceMappingURL=StateSet.js.map