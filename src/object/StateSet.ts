import Node from "../Node.js";

export default class StateSet {
  private currentStateNode: Node | undefined;

  constructor(
    target: Node,
    private states: { [state: string]: Node },
    initialState: string,
  ) {
    for (const state in states) {
      target.append(states[state]);
      if (state === initialState) this.currentStateNode = states[state];
      else states[state].hide();
    }
  }

  public setState(state: string) {
    this.currentStateNode?.hide();
    this.currentStateNode = this.states[state];
    this.currentStateNode?.show();
  }
}
