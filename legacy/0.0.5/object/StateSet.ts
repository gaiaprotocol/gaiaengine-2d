import Node from "../base/Node.js";

export default class StateSet {
  private currentStateNode: Node | undefined;

  constructor(
    target: Node,
    private states: { [state: string]: Node },
    private currentState: string,
  ) {
    for (const state in states) {
      target.append(states[state]);
      if (state === currentState) this.currentStateNode = states[state];
      else states[state].hide();
    }
  }

  public set state(state: string) {
    this.currentState = state;
    this.currentStateNode?.hide();
    this.currentStateNode = this.states[state];
    this.currentStateNode?.show();
  }

  public get state() {
    return this.currentState;
  }
}
